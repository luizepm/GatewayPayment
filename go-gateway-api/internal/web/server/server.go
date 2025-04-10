package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/luizepm/go-gateway/internal/service"
	handlers "github.com/luizepm/go-gateway/internal/web/handler"
	"github.com/luizepm/go-gateway/internal/web/middleware"
)

type Server struct {
	router         *chi.Mux // pacote de roteador com diversos recursos (mux)
	server         *http.Server
	accountService *service.AccountService
	invoiceService *service.InvoiceService
	port           string
}

func NewServer(accountService *service.AccountService, invoiceService *service.InvoiceService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		accountService: accountService,
		invoiceService: invoiceService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	accountHandler := handlers.NewAccountHandler(s.accountService)
	invoiceHandler := handlers.NewInvoiceHandler(s.invoiceService)
	authMiddleware := middleware.NewAuthMiddleware(s.accountService)

	s.router.Post("/accounts", accountHandler.Create)
	s.router.Get("/accounts", accountHandler.Get)

	// Agrupando endpoints de fatura
	// grupo de rotas protegidas por autenticação via middleware
	s.router.Group(func(r chi.Router) {
		r.Use(authMiddleware.Authenticate)
		s.router.Post("/invoice", invoiceHandler.Create)
		s.router.Get("/invoice/{id}", invoiceHandler.GetByID)
		s.router.Get("/invoice", invoiceHandler.ListByAccount)
	})
}

// Start inicia o servidor HTTP
func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}
	return s.server.ListenAndServe()
}
