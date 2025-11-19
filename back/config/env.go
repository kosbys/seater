package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	JWTSecret []byte
	SECRET    string
	PORT      string
)

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file loaded, expect explosions")
	}

	JWTSecret = []byte(os.Getenv("JWT_SECRET"))
	SECRET = string(os.Getenv("SECRET"))
	PORT = string(os.Getenv("PORT"))

}
