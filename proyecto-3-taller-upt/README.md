# Taller ¿IA tú sabes? 🐦

## Descripción

Este taller práctico (1h30) enseña a crear una mini red social tipo microblogging con scroll infinito.

Stack:
- Frontend: HTML, CSS y JavaScript puro
- Backend: Python sin frameworks
- Base de datos: SQLite
- Contenedores: Docker
- Orquestación: Makefile

Al finalizar, también usaremos Helm para desplegar en Kubernetes.

## Estructura del proyecto

```
proyecto-3-taller-upt/
├── Makefile
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── schema.sql
│   ├── db.py
│   └── app.py
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── index.html
    ├── style.css
    └── main.js
```

## Uso con Docker

1. Construir imágenes:
   ```bash
   make build
   ```
2. Levantar contenedores:
   ```bash
   make up
   ```
3. Detener todo:
   ```bash
   make down
   ```

- Backend: http://localhost:5001/messages
- Frontend: http://localhost:8080

¡A disfrutar el taller!   