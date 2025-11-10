package model

type Section struct {
	ID       uint      `gorm:"primaryKey"`
	Name     string    `gorm:"uniqueIndex"`
	Stations []Station `gorm:"foreignKey:SectionID"`
}

type SectionCreateRequest struct {
	Name string `json:"section_name" binding:"required"`
}

type SectionDeleteRequest struct {
	ID `json:"section_id", binding:"required"`
}
