package model

type Station struct {
	ID        uint `gorm:"primaryKey"`
	SectionID uint
	Computer  bool
	Monitor   bool
	Shifts    []Shift `gorm:"foreignKey:StationID"`
	Section   Section `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
