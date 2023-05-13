variable "root_domain" {
  description = "The root domain for the application"
  type        = string
  default     = "adrianroque.dev"
}

variable "backend_domain" {
  description = "The domain for the backend"
  type        = string
  default     = "transcendence-api.adrianroque.dev"
}

variable "frontend_domain" {
  description = "The domain for the frontend"
  type        = string
  default     = "transcendence.adrianroque.dev"
}