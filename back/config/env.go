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

	JWTSecret = []byte(os.Getenv("JWT_SECRET"))

}
