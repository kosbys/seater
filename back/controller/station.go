package controller

import (
	"back/database"
	"back/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateStation(c *gin.Context) {
	var req model.StationCreateRequest

	err := c.ShouldBindJSON(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	station := model.Station{
		SectionID: req.SectionID,
		Computer:  req.Computer,
		Monitor:   req.Monitor,
		Name:      req.Name,
	}

	result := database.DB.Create(&station)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create station"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Station created successfully",
		"station": station,
	})
}

func DeleteStation(c *gin.Context) {
	id := c.Param("id")

	result := database.DB.Delete(&model.Station{}, id)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Station not found"})
		return
	}

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete station"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Station deleted"})
}
