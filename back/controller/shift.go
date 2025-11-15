package controller

import (
	"back/database"
	"back/model"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

const layout = "2006-01-02"

// check uniqueness
func CreateShift(c *gin.Context) {
	userID, exists := c.Get("user_id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authenticated"})
		c.Abort()
		return
	}

	var req model.ShiftCreateRequst

	err := c.ShouldBindJSON(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
}

func DeleteShift(c *gin.Context) {

}

func GetShiftsByWeek(c *gin.Context) {
	sundayString := c.Param("day")

	sundayDate, err := time.Parse(layout, sundayString)

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid date format"})
		return
	}

	if sundayDate.Weekday() != time.Sunday {
		c.JSON(400, gin.H{"error": "Not a sunday"})
		return
	}

	thursdayDate := sundayDate.AddDate(0, 0, 4)

	var shifts []model.Shift

	err = database.DB.Where("date BETWEEN ? AND ?", sundayDate.Format(layout), thursdayDate.Format(layout)).Find(&shifts).Error

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"shifts": shifts})
}

func GetShiftsByDay(c *gin.Context) {
	dayString := c.Param("day")

	dayDate, err := time.Parse(layout, dayString)

	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid date format"})
		return
	}

	var shifts []model.Shift

	err = database.DB.Where("date = ?", dayDate.Format(layout)).Find(&shifts).Error

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"shifts": shifts})
}
