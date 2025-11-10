package controller

import (
	"back/database"
	"back/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateSection(c *gin.Context) {
	var req model.SectionCreateRequest

	err := c.ShouldBindJSON(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var exists model.Section

	err = database.DB.Where("name = ?", req.Name).Take(&exists).Error

	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Section already exists"})
		return
	}

	section := model.Section{
		Name: req.Name,
	}

	result := database.DB.Create(&section)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create section"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Section created successfully",
		"section": section.Name,
	})
}

func DeleteSection(c *gin.Context) {
	var req model.SectionDeleteRequest

	err := c.ShouldBindJSON(&req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	result := database.DB.Delete(&model.Section{}, req.ID)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Section not found"})
		return
	}

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete section"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Section deleted"})
}
