# Dockerfile para backend Java sin frameworks

FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar esquema y código fuente
COPY schema.sql ./
COPY src ./src

# Compilar
RUN javac src/Main.java -d out

# Inicializar base de datos
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    sqlite3 messages.db < schema.sql && \
    rm -rf /var/lib/apt/lists/*

# Ejecutar
CMD ["java", "-cp", "out", "Main"]