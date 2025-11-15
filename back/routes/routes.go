package routes

import (
	"back/controller"
	"back/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {
		// 	return origin == "https://github.com"
		// },
		MaxAge: 12 * time.Hour,
	}))

	public := r.Group("/")
	{
		public.POST("register", controller.Register)
		public.POST("login", controller.Login)
		public.GET("refresh", controller.Refresh)
		public.POST("logout", controller.Logout)
	}

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("sections", controller.GetSections)
		protected.GET("/shifts/week/:day", controller.GetShiftsByWeek)
		protected.GET("/shifts/day/:day", controller.GetShiftsByDay)
		protected.POST("/shifts", controller.CreateShift)
	}

	admin := r.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	admin.Use(middleware.AdminMiddleware())
	{
		admin.POST("/section", controller.CreateSection)
		admin.POST("/station", controller.CreateStation)
		admin.DELETE("/section/:id", controller.DeleteSection)
		admin.DELETE("/station/:id", controller.DeleteStation)
	}

	return r
}
