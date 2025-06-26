# Dockerfile para backend Java sin frameworks con SQLite JDBC

FROM openjdk:17-jdk-slim
WORKDIR /app

# Instalar utilidades y sqlite3 para inicializar la DB
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y sqlite3 wget && \
    rm -rf /var/lib/apt/lists/*

# Copiar esquema y código fuente
COPY schema.sql ./
COPY src ./src

# Compilar el código Java
RUN javac src/Main.java -d out

# Descargar driver JDBC para SQLite
RUN wget -qO sqlite-jdbc.jar https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.40.0.0/sqlite-jdbc-3.40.0.0.jar

# Inicializar base de datos usando sqlite3 (CLI)
RUN sqlite3 messages.db < schema.sql

# Ejecutar el servidor, incluyendo el driver en el classpath
CMD ["java", "-cp", "out:sqlite-jdbc.jar", "Main"]