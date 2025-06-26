# Makefile para proyecto-2-taller-upt

.PHONY: build build-backend build-frontend run clean

build: build-backend build-frontend
	@echo "Build completo."

build-backend:
	docker build -t taller-upt-backend ./backend

build-frontend:
	docker build -t taller-upt-frontend ./frontend

run: build
	docker run -d -p 8080:8080 --name backend taller-upt-backend
	docker run -d -p 80:80 --name frontend taller-upt-frontend
	@echo "Contenedores en ejecución. Backend: http://localhost:8080/messages, Frontend: http://localhost"

clean:
	docker rm -f backend frontend || true
	docker rmi -f taller-upt-backend taller-upt-frontend || true
