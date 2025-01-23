package controller

import (
	"crypto/sha256"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GenerateHashQ1(c *gin.Context) {
	keyOne := "2533"
	hash := sha256.Sum256([]byte(keyOne))
	c.JSON(http.StatusOK, gin.H{                    
		"hash":     fmt.Sprintf("%x", hash),      
	})
}

func GenerateHashQ2(c *gin.Context) {
	keyOne := "8000"
	hash := sha256.Sum256([]byte(keyOne))
	c.JSON(http.StatusOK, gin.H{                      
		"hash":     fmt.Sprintf("%x", hash),      
	})
}

func TrackHash(c *gin.Context) {
	hash := c.Query("hash")

	if hash == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Hash parameter is missing"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Hash received successfully",
		"hash":    hash,
	})
}

func CheckAnswerHash(c *gin.Context) {
	keyOne := "1990"
	keyTwo := "8000"

	expectedSum := 9990

	hashOne := sha256.Sum256([]byte(keyOne))
	hashTwo := sha256.Sum256([]byte(keyTwo))

	answer := c.Query("answer")

	if answer == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Answer parameter is missing"})
		return
	}

	answerInt, err := strconv.Atoi(answer)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid answer format"})
		return
	}

	if answerInt == expectedSum {
		c.JSON(http.StatusOK, gin.H{
			"message": "Correct answer!",
			"expected": gin.H{
				"hashOne": fmt.Sprintf("%x", hashOne),
				"hashTwo": fmt.Sprintf("%x", hashTwo),
				"sum":     expectedSum,
			},
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Incorrect answer",
			"expected": gin.H{
				"hashOne": fmt.Sprintf("%x", hashOne),
				"hashTwo": fmt.Sprintf("%x", hashTwo),
				"sum":     expectedSum,
			},
		})
	}
}