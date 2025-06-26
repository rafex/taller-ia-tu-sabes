# Taller ¿IA tú sabes?

## Descripción del taller

En este taller práctico de 1 hora y 30 minutos, los participantes aprenderán a crear una aplicación sencilla tipo red social con scroll infinito utilizando tecnologías web básicas y contenedores Docker. El stack tecnológico incluye un frontend con HTML, CSS y JavaScript puro, un backend en Java sin frameworks, una base de datos SQLite y un despliegue en Kubernetes utilizando Helm. El objetivo es que los participantes puedan levantar el entorno en sus máquinas y llevarse un entregable funcional al finalizar el taller.

## Objetivos del taller

1. **Familiarizarse con el uso de IA** para generar código y acelerar el desarrollo.
2. **Crear un frontend básico** con HTML, CSS y JavaScript puro.
3. **Implementar un backend sencillo** en Java sin frameworks, con una API REST.
4. **Configurar una base de datos SQLite** para persistencia de datos.
5. **Utilizar Docker** para contenerizar la aplicación y facilitar su despliegue.
6. **Makefile** para automatizar la construcción y ejecución de contenedores.

## Estructura del proyecto

```plain
proyecto-2-taller-upt/
├── README.md
├── Makefile
├── backend/
│   ├── schema.sql
│   ├── Dockerfile
│   └── src/
│       └── Main.java
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   └── Dockerfile
└── helm-chart/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment-backend.yaml
        ├── service-backend.yaml
        ├── deployment-frontend.yaml
        └── service-frontend.yaml
```

## Paso a paso

### 1. Clonar el repositorio

```shell
git clone <url-del-repo>
cd proyecto-2-taller-upt
```

### 2. Construir imágenes Docker

```shell
make build
```

### 3. Levantar contenedores localmente

```shell
make run
```
- El backend quedará disponible en http://localhost:8080/messages
- El frontend en http://localhost:80

### 4. Probar la aplicación

- Abrir el navegador en http://localhost
- Enviar mensajes desde el formulario
- Hacer scroll para cargar más mensajes

### 5. Desplegar en Kubernetes con Helm

```shell
cd helm-chart
helm install twitter-app .
```

Para listar servicios y pods:

```shell
kubectl get all
```

## Validar

Ejecuta el archivo `Makefile` para construir y ejecutar el proyecto. Asegúrate de que todos los comandos funcionen correctamente y que la aplicación se levante sin errores.