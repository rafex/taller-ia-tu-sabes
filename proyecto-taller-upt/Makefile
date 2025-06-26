# Makefile para construir y levantar frontend y backend con Docker

# Imágenes y network
define IMAGE_BACKEND
mini-backend
endef

define IMAGE_FRONTEND
mini-frontend
endef

define NETWORK
mini-net
endef

# Puertos (host:container)
# Puedes sobreescribir PORT_BACKEND al invocar: make up PORT_BACKEND=5000
PORT_BACKEND  ?= 5001
PORT_FRONTEND ?= 8080

.PHONY: all build build-backend build-frontend up down logs-backend logs-frontend clean

all: build

# Construir ambas imágenes
build: build-backend build-frontend

# Construir imagen del backend
build-backend:
	docker build -t $(IMAGE_BACKEND) -f backend/Dockerfile backend

# Construir imagen del frontend
build-frontend:
	docker build -t $(IMAGE_FRONTEND) -f frontend/Dockerfile frontend

# Levantar contenedores
up: ## Levanta backend y frontend en Docker
	$(MAKE) down
	@echo "Creando red $(NETWORK) si no existe..."
	@docker network create $(NETWORK) 2>/dev/null || true
	@echo "Levantando backend..."
	@docker rm -f backend 2>/dev/null || true
	@docker run -d --rm --name backend --network $(NETWORK) -p $(PORT_BACKEND):5000 $(IMAGE_BACKEND)
	@echo "Levantando frontend..."
	@docker rm -f frontend 2>/dev/null || true
	@docker run -d --rm --name frontend --network $(NETWORK) -p $(PORT_FRONTEND):80 $(IMAGE_FRONTEND)
	@echo "Backend: http://localhost:$(PORT_BACKEND)"
	@echo "Frontend: http://localhost:$(PORT_FRONTEND)"

# Detener contenedores
down:
	@docker rm -f backend frontend 2>/dev/null || true
	@echo "Contenedores detenidos."

# Ver logs del backend
logs-backend:
	@docker logs -f backend

# Ver logs del frontend
logs-frontend:
	@docker logs -f frontend

# Eliminar imágenes
easy-clean: clean-images down

clean-images:
	@docker rmi -f $(IMAGE_BACKEND) $(IMAGE_FRONTEND) 2>/dev/null || true
