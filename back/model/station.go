package model

type Station struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	SectionID uint    `json:"section_id"`
	Name      string  `json:"name"`
	Computer  bool    `json:"computer"`
	Monitor   bool    `json:"monitor"`
	Tablet    bool    `json:"tablet"`
	Shifts    []Shift `gorm:"foreignKey:StationID"`
	Section   Section `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type StationCreateRequest struct {
	SectionID uint
	Name      string
	Computer  bool
	Monitor   bool
	Tablet    bool
}
