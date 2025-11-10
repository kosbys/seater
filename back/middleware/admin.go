package middleware

import (
	"back/database"
	"back/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")

		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authenticated"})
			c.Abort()
			return
		}

		var userIDUint uint

		switch id := userID.(type) {
		case float64:
			userIDUint = uint(id)
		case int:
			userIDUint = uint(id)
		case uint:
			userIDUint = id
		case string:
			parsedID, err := strconv.ParseUint(id, 10, 64)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
				c.Abort()
				return
			}
			userIDUint = uint(parsedID)
		default:
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
			c.Abort()
			return
		}

		var user model.User

		err := database.DB.First(&user, "id = ?", userIDUint).Error

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No user found"})
			c.Abort()
			return
		}

		if user.Role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No privileges"})
			c.Abort()
			return
		}

		c.Next()
	}
}
