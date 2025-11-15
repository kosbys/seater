package model

import "time"

type Shift struct {
	ID        uint `gorm:"primaryKey"`
	StationID uint
	UserID    uint
	Date      time.Time
	StartTime uint
	EndTime   uint
	User      User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Station   Station `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type ShiftCreateRequst struct {
	Date      time.Time
	StationID uint
	StartTime uint
	EndTime   uint
}
