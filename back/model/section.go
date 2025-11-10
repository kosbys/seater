package model

type Section struct {
	ID       uint      `gorm:"primaryKey"`
	Name     string    `gorm:"uniqueIndex"`
	Stations []Station `gorm:"foreignKey:SectionID"`
}

type SectionCreateRequest struct {
	Name string `json:"name" binding:"required"`
}
