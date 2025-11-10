package middleware

import (
	"back/database"
	"back/model"
	"net/http"

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

		var user model.User

		err := database.DB.First(&user, "id = ?", userID.(string)).Error

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
