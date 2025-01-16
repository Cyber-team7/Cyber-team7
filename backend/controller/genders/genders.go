package genders

import (
	"net/http"

	"cyber-team7/config"

	"cyber-team7/entity"

	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {

	db := config.DB()

	var genders []entity.Genders

	db.Find(&genders)

	c.JSON(http.StatusOK, &genders)

}
