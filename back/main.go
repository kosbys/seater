package main

import (
	"back/database"
	"back/model"
	"back/routes"
	"log"
)

func main() {
	database.ConnectDB()

	r := routes.SetupRouter()

	database.DB.AutoMigrate(&model.User{})

	if err := database.DB.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	r.Run()

}
