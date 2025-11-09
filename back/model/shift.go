package model

import "time"

type Shift struct {
	ID        uint `gorm:"primaryKey"`
	StationID uint
	UserID    uint
	StartTime time.Time
	EndTime   time.Time
	User      User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Station   Station `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
