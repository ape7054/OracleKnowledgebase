package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"market-pulse/backend/internal/models"

	"github.com/golang-jwt/jwt/v5"
)

// AuthHandler handles authentication related requests.
type AuthHandler struct {
	Db         *gorm.DB
	JwtSecret  string
	JwtExpires time.Duration
}

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Claims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

// NewAuthHandler creates a new AuthHandler.
func NewAuthHandler(db *gorm.DB, jwtSecret string, jwtExpires time.Duration) *AuthHandler {
	return &AuthHandler{
		Db:         db,
		JwtSecret:  jwtSecret,
		JwtExpires: jwtExpires,
	}
}

// RegisterRoutes registers the authentication routes.
func (h *AuthHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.POST("/register", h.Register)
	router.POST("/login", h.Login)
}

// --- Route Handlers ---

// Register handles user registration.
func (h *AuthHandler) Register(c *gin.Context) {
	var input RegisterInput

	// 1. Bind and validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 2. Check if user already exists
	var existingUser models.User
	if err := h.Db.Where("username = ?", input.Username).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	// 3. Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// 4. Create the new user
	newUser := models.User{
		Username:     input.Username,
		PasswordHash: string(hashedPassword),
	}

	// 5. Save user to the database
	if err := h.Db.Create(&newUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// 6. Return success response
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}

// Login handles user login and JWT issuance.
func (h *AuthHandler) Login(c *gin.Context) {
	var input LoginInput

	// 1. Bind and validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 2. Find the user
	var user models.User
	if err := h.Db.Where("username = ?", input.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// 3. Compare password with hash
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// 4. Create JWT claims
	expirationTime := time.Now().Add(h.JwtExpires)
	claims := &Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "market-pulse",
		},
	}

	// 5. Create and sign the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(h.JwtSecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// 6. Return the token
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
