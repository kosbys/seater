package model

type Section struct {
	ID       uint      `gorm:"primaryKey" json:"id"`
	Name     string    `gorm:"uniqueIndex" json:"name"`
	Stations []Station `gorm:"foreignKey:SectionID" json:"stations"`
}

type SectionCreateRequest struct {
	Name string `json:"name" binding:"required"`
}
