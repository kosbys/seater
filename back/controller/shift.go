package controller

import (
	"back/database"
	"back/model"
	"time"

	"github.com/gin-gonic/gin"
)

const layout = "2006-01-02"

func CreateShift(c *gin.Context) {

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
