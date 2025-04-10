package domain

import (
	"crypto/rand"
	"encoding/hex"
	"sync"
	"time"

	"github.com/google/uuid"
)

// Estrutura do domain (como se fosse a classe)
type Account struct {
	ID        string
	Name      string
	Email     string
	APIKey    string
	Balance   float64
	mu        sync.RWMutex
	CreatedAt time.Time
	UpdatedAt time.Time
}

func generateAPIKey() string {
	b := make([]byte, 16)        // [] array slice, dinamico, pois todo array no go é fixo o tamanho
	rand.Read(b)                 // Preenche o array com bytes aleatórios
	return hex.EncodeToString(b) // Converte os bytes para string hexadecimal
}

// Construtor
func NewAccount(name, email string) *Account {
	// Toda vez que for criar uma nova varíavel, na 1ª vez colocar := que ele entende o tipo
	// & apontamento para struct account, ou seja, o endereço de memória
	account := &Account{
		ID:        uuid.New().String(),
		Name:      name,
		Email:     email,
		Balance:   0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return account
}

func (a *Account) AddBalance(amount float64) {
	a.mu.Lock() // bloquear a escrita enquanto está escrevendo
	a.Balance += amount
	a.UpdatedAt = time.Now()
	a.mu.Unlock() // liberar o bloqueio
}
