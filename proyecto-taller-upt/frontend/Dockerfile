FROM nginx:alpine
# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiar archivos estáticos
COPY index.html style.css main.js /usr/share/nginx/html/
EXPOSE 80