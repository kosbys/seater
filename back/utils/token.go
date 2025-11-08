package utils

import (
	"back/config"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const (
	AccessTokenExpireTime  = time.Minute * 20
	RefreshTokenExpireTime = time.Hour * 24 * 7
)

func GenerateAccessToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(AccessTokenExpireTime).Unix(),
		"iat": time.Now().Unix(),
		"typ": "access",
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.JWTSecret))
}

func GenerateRefreshToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(RefreshTokenExpireTime).Unix(),
		"iat": time.Now().Unix(),
		"typ": "refresh",
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.JWTSecret))
}

func SetTokenCookie(c *gin.Context, token string, tokenType string) {
	var maxAge int

	switch tokenType {
	case "access_token":
		maxAge = int(AccessTokenExpireTime.Seconds())
	case "refresh_token":
		maxAge = int(RefreshTokenExpireTime.Seconds())
	}

	c.SetCookie(
		tokenType, // cookie name
		token,
		maxAge, // max-age in seconds
		"/",    // path
		"",     // domain
		false,  // secure (true if HTTPS)
		true,   // HttpOnly
	)
}
