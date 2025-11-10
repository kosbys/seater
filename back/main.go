package main

import (
	"back/database"
	"back/model"
	"back/routes"
	"log"
)

func main() {
	database.ConnectDB()

	database.DB.AutoMigrate(&model.User{}, &model.Section{}, &model.Station{}, &model.Shift{})

	r := routes.SetupRouter()

	if err := database.DB.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	r.Run()

}
