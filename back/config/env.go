package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DatabaseURL string
	JWTSecret   []byte
)

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file loaded, expect explosions")
	}

	DatabaseURL = os.Getenv("DATABASE_URL")
	JWTSecret = []byte(os.Getenv("JWT_SECRET"))

}
