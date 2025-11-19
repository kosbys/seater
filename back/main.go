package main

import (
	"back/config"
	"back/database"
	"back/model"
	"back/routes"
	"fmt"
	"log"
)

func main() {
	database.ConnectDB()

	database.DB.AutoMigrate(&model.User{}, &model.Section{}, &model.Station{}, &model.Shift{})

	r := routes.SetupRouter()

	if err := database.DB.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// change when prod
	r.SetTrustedProxies([]string{})
	r.Run(fmt.Sprintf("localhost:%s", config.PORT))

}
