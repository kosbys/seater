package model

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"uniqueIndex; not null"`
	Password string `gorm:"not null"`
	Role     string `gorm:"default:user"`
}

type UserResponse struct {
	Username string `json:"username"`
	Role     string `json:"role"`
}

type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Role     string `json:"role"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}
