package model

import "time"

// export type Shift = {
// 	id: number;
// 	name: string;
// 	date: Date;
// 	startTime: number;
// 	endTime: number;
// };

// put json bindings
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

type ShiftResponse struct {
	ID        uint      `json:"id"`
	StationID uint      `json:"stationID"`
	UserID    uint      `json:"userID"`
	Date      time.Time `json:"date"`
	StartTime uint      `json:"startTime"`
	EndTime   uint      `json:"endTime"`
	Username  string    `json:"username"`
	Station   string    `json:"stationName"`
}
type ShiftCreateRequst struct {
	Date      string
	StationID uint
	StartTime uint
	EndTime   uint
}
