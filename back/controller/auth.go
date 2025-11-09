package controller

import (
	"back/config"
	"back/database"
	"back/model"
	"back/utils"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var req model.RegisterRequest

	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "dbg": err})
		return
	}

	fmt.Println(req)

	if req.Role == "" {
		req.Role = "user"
	}

	var exists model.User

	err = database.DB.Where("username = ?", req.Username).Take(&exists).Error

	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists"})
		return
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}

	user := model.User{
		Username: req.Username,
		Password: string(hashed),
		Role:     req.Role,
	}

	result := database.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user"})
		return
	}

	accessToken, _ := utils.GenerateAccessToken(user.ID)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID)

	utils.SetTokenCookie(c, accessToken, "access_token")
	utils.SetTokenCookie(c, refreshToken, "refresh_token")

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user":    user.Username,
	})
}

func Login(c *gin.Context) {
	var req model.LoginRequest

	err := c.ShouldBindJSON(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user model.User
	err = database.DB.Where("username = ?", req.Username).Take(&user).Error

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Username))

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	accessToken, _ := utils.GenerateAccessToken(user.ID)
	refreshToken, _ := utils.GenerateRefreshToken(user.ID)

	utils.SetTokenCookie(c, accessToken, "access_token")
	utils.SetTokenCookie(c, refreshToken, "refresh_token")

	c.JSON(http.StatusCreated, gin.H{
		"message": "Login success",
		"user":    user.Username,
	})
}

func Logout(c *gin.Context) {

}

func Refresh(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing refresh token"})
		return
	}

	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.JWTSecret), nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok || claims["typ"] != "refresh" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	exp := claims["exp"].(float64)

	if time.Unix(int64(exp), 0).Before(time.Now()) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Expired refresh token"})
		return
	}

	userID := uint(claims["sub"].(float64))

	var user model.User

	err = database.DB.Where("id = ?", userID).Take(&user).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	accessToken, _ := utils.GenerateAccessToken(userID)
	utils.SetTokenCookie(c, accessToken, "access_token")
	newRefreshToken, _ := utils.GenerateRefreshToken(uint(userID))
	utils.SetTokenCookie(c, newRefreshToken, "refresh_token")

	c.JSON(http.StatusOK, gin.H{
		"message": "Refreshed token",
		"user":    user.Username,
	})
}
