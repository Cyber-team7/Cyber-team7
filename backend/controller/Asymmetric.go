package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var publicKeyString = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvQhXsQjtKML26JGCAlt+bSipXBJ0MV04EE9dUDNp/Mzi6erybRVf9Yj7sph6Cdwesm3taTpzTDwOopJZpA/kkEkLNWqXrJ7tUMvPp0ZTZ9h7C2DbRfBTm4S+yGr7xTPm1EWDX510P+wt0pDvoIxYtJqX74kaSrNRRk1UP410qNnFMnjpyi9/V1UNdM9DpD33ApH/VYpPDAp3CMitTwRSB08u1JLmkN++8aYkEmpbkw4Nyrs0Ho0Wo6paZQ1KXu4K9Tw1QjWkC+8sx+WJVD7I3cfI2CbsjXFCfGetGVHmDuPHBtBuZP6ScqlvepKjvVjtUz0CWOIGWISlFHkpHydg+wIDAQAB"
var privateKeyString = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9CFexCO0owvbokYICW35tKKlcEnQxXTgQT11QM2n8zOLp6vJtFV/1iPuymHoJ3B6ybe1pOnNMPA6iklmkD+SQSQs1apesnu1Qy8+nRlNn2HsLYNtF8FObhL7IavvFM+bURYNfnXQ/7C3SkO+gjFi0mpfviRpKs1FGTVQ/jXSo2cUyeOnKL39XVQ10z0OkPfcCkf9Vik8MCncIyK1PBFIHTy7UkuaQ377xpiQSaluTDg3KuzQejRajqlplDUpe7gr1PDVCNaQL7yzH5YlUPsjdx8jYJuyNcUJ8Z60ZUeYO48cG0G5k/pJyqW96kqO9WO1TPQJY4gZYhKUUeSkfJ2D7AgMBAAECggEABa3nfJEpFu1sn6Yngsye6saq9/Ix/X2wfoTz58HzsD2zn5WIfRCEVossDLyaBgvP/EpjNKMl7adsRSQif1Re6JrZNFyke/I2bRQChCMPxHHzmG7rh5ll2alOVhUoxU7+42fHP6sqX/VHlyj1mhw9Wge/AtpaqN3kVjlii5pDZANBufpRZbNDOJmW1LYLC6iXv2nbo/LkwitjH6ahU/iArlHAXE7OKhbP+/HRftp4ITQkab7SVIf9Y71Rq8K0IOL4ATNy8QGitvJIqiDtQlB90/y4QfZU21wQmkBsh/yEkUHX9Q9k+BpwN9RT0WbhIPCIr+uea+1RKjPdPFgD9giV2QKBgQDf8J9kECLdy3U1x+qVfAw+uXHQ3tB+vJzXCETgXMrNJlWaL8UDC5vMi8vd7LcQLql+dyudGvXj3KX8kyF3RQynchkbuP1Ud9fJmy0GiAxSlcho41GgtI/yT83ZmNJLeYrksQgvVkK2CmFLuzt1AdYCjgUS+RqtFaRcpoJE8sCp7wKBgQDYGF56rE/b8Ou/dBfO1GGkhcOaiBQVFIMrX5aGh6JbTA0f4ePMyBika5lW1PcqJpmn6fVAgg3IVILyrVaU4Ifzzp3yFQqU7lJ3A23U75f8Q8QOWSDb0HB3AfPTMEXOGUJdFP0ooVaJjYZ2eOlhdkHT9WoTk9GboadHfg27/gt1tQKBgQDRh8sbTR3SePQKhiuwAolShyE/VbuvWbtGV65aX3hBy4R86AVmfA4irQrrcvk2YvKkKczdCsTXlzSXxvKhLjJQ2ik0Dzq5Ngjp0g+m9NTS0OLbgRZ3T3sANjtdReg+RlL29824vPVebwfqXB2dtUIQ0eFdh0a2fHF1Xza0XI54cQKBgQDAeSwl7baPu03v0DKoeYii5rXrvUrN3+BZUKGdH9Afq2SBQk0JiCxSvrfsnHGt7IWuBvf4Rh6KkaO1DWlx32+YXC9YgR9UudVfxgEcyW9BNQa6lO5se4LArU+EipmSUfNHPzuh5dpTWGgsu9N7iL5nUU7zMxVenqSFTCRljoichQKBgG7sOWfi9t5s8sgu8IgkZorBEkDOIpyNIrm5mBXFTChwhiaFT5v67OCLQud22+DNBN7ym9X08LNqkSQdXecsWXfyBeFpUL9vjTikGEqvbFgGZBbQCUEWotgH7GB8B9G4MtxpBdrswLWhRT0TGZtjOWMtg8w/jfuvaK+X6dFH4CsW"
var targetEncryptedText = "u5a0V3VcOuaTfIiNXuVcCBP4cXHKuENuNEPIyJqzVk+7WovxbGxkI2YFEf0rgms6GmEb3O+OOCTyaOdLZhnmlYqJiPtorf9THELRL8rDBt/LBIrb9q2BniXbazTGY+Z94gDOvot+r4ca7Dkz5Vsv9LmYpDcv9K7aLHdrUcvy9x9dW77D7o6hB0+qfgwZLuioq/t/ooUNPdCr4KkBTqVHA5Va2M7TukdahkNhl/mHvNIDU5XcpVMwDPx6gVTLzgMtaOkrTJhEzDuWnrjwtu2a24OG3OcHPIUlPLiNYn7np9yk8B0T+pcJNpKPxXbyvZyS/N0XREL6PixduppISDlfjQ=="
var targetDecryptedText = "https://clrem-opac.sut.ac.th/opac2/Search_Basic.aspx"
var bookTitle = "Gray hat hacking"

func Asymmetric(c *gin.Context) {
	publicKey := []string{
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv7ggNuQ5fdH/0zmmBYa6wtZ9sP7oD9EgYyQ60bnRYOMM0u7BozeOiJGky1Z54IY6GCwpEJE200+s3/kI2j0xlZ17q6rMegOFgzNkJKRGuAU8Fx9yasNG+E35QAukZpLdUAhKis1S11+bPkn4xMEMAK32cUo2Ypmq6+KCESI2SWghC0uY+fg608qriWK0Nrk+wznQLcRkKlnAlCvZ9ACXAQAZjoKM9UIE4gQ5q9npGDcIYBuBpp/4SqdSiTSuMWnQBaaNBbwZyrbUhVYmoL7RZ4H5Nirzh8RcQ8PwLhIvO1oWOIafdv+JWaePSDvpErdj+3+oJ1+4gRMgmU6vYI9cHQIDAQAB",
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuGrM7kp8pBqO713cIPd93+Ts8nCBjZcSa/DEnGBzdBfCZyi/vxJs05/0Cl6cZQNV8cPh+2b4KdMw6JHj0L9sPe4D0lxUMN2Ju3NrCe855HaFroXAcLPksayZJ4XJLNtSO3kb8gknvKt3cARhw9TkMwWXddNcUs78yeeT6BvyXQ8uG7/JAcM5mqcmuUhIqchlvbIQj4Tr/0HMdaKhOeDF8PfrOZiVeaAwYaER4SZw9GhitN01cYOF4Xz2XxHF/vl9eCp4FX5m7lJZa788UWOYV5RAc05arAMNw770W5DzNH6WDrEe/D+Ix4ZoyqeZXHsvS9eiz3jlIX/RTyFRlSy8qQIDAQAB",
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0C6Hw2z7lSz9gnz4RPTXsEXSvczjWykpXOMAVmrNU5KCWqX59psJpZKIkeI/h6VDumKtOOrj4wsVgCI1U4jLusac93P6wH1dVtzRYfaUxp44iRthDqW7A6n64ofCdz6szPcOU+rSuZOB9EOpnh17f7BHCF9mVNqnbMf7FoaeNG64qIkxT6C6IMEd4KYLKBOn4o8ZTEq5Qu4t9QvAreT/WH9dpVVXwBaYJXNcRWkQejwg7mqkI87uuANhqu8o7Zg1HwdTS4C7RSiW5SqOxqHO5faj5gPi+cUeipdz6Ahm0RVqkXMMfE252N0/pEBUXdf0lNexVqBuijIy74oydAXy6wIDAQAB",
		publicKeyString,
		"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",
	}

	processedPublicKey := append([]string{}, publicKey...)

	c.JSON(http.StatusOK, gin.H{
		"encryptedText": targetEncryptedText,
		"publicKey":     processedPublicKey,
	})
}

func CheckDecryptedText(c *gin.Context) {

	var requestData struct {
		DecryptedText string `json:"decryptedText"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	if requestData.DecryptedText == targetDecryptedText {
		c.JSON(http.StatusOK, gin.H{"message": "ยินดีด้วย คุณแก้ผ่านแล้ว ไปด่านต่อไป"})
	} else {
		// ถ้าไม่ตรงให้ส่ง response ว่าไม่ตรง
		c.JSON(http.StatusUnauthorized, gin.H{"message": "ค่าที่ส่งมายังไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง!"})
	}
}

func CheckFinalAnswer(c *gin.Context) {
	book_title := c.Param("book_title")

	if book_title == bookTitle {
		c.JSON(http.StatusOK, gin.H{"message": "ยินดีด้วย คุณแก้ผ่านด่านทั้งหมดแล้ว 🎉"})
	} else {
		// ถ้าไม่ตรงให้ส่ง response ว่าไม่ตรง
		c.JSON(http.StatusUnauthorized, gin.H{"message": "อีกนิดเดียว เกือบผ่านแล้ว"})
	}
}
