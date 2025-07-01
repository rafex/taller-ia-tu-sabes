# Makefile para proyecto-3-taller-upt

IMG_BACK=proyecto3-backend
IMG_FRONT=proyecto3-frontend
NET=proyecto3-net

PORT_BACK?=5001
PORT_FRONT?=8080

.PHONY: build up down

# Construir imágenes
build:
	docker build -t $(IMG_BACK) backend
	docker build -t $(IMG_FRONT) frontend

# Levantar contenedores
up: down
	@echo "Creando red $(NET) si no existe..."
	@docker network create $(NET) 2>/dev/null || true
	@echo "Levantando backend..."
	@docker run -d --rm --name backend --network $(NET) -p $(PORT_BACK):5000 $(IMG_BACK)
	@echo "Levantando frontend..."
	@docker run -d --rm --name frontend --network $(NET) -p $(PORT_FRONT):80 $(IMG_FRONT)
	@echo "Backend: http://localhost:$(PORT_BACK)/messages"
	@echo "Frontend: http://localhost:$(PORT_FRONT)"

# Detener contenedores
down:
	docker rm -f backend frontend 2>/dev/null || true
	@echo "Contenedores detenidos."