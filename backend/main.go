package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"cyber-team7/config"
	"cyber-team7/controller"
)

const PORT = "8000"

func main() {

	// open connection database

	config.ConnectionDB()

	// Generate databases

	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("/")

	{

		router.Use()

		// Exam one
		router.GET("/hashone", controller.GenerateHashQ1)

		router.GET("/hashtwo", controller.GenerateHashQ2)

		router.GET("/trackHash", controller.TrackHash)

		router.GET("/checkAnswerHash", controller.CheckAnswerHash)

		// Exam two
		router.GET("/symmetric", controller.Symmetric)

		// Exam three
		router.GET("/asymmetric", controller.Asymmetric)
		router.POST("/checkAnswerAsymmetric", controller.CheckDecryptedText)
		router.GET("/checkFinalAnswer/:book_title", controller.CheckFinalAnswer)

	}

	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
