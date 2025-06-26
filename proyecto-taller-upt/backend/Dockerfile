FROM python:3.11-slim
WORKDIR /app
COPY schema.sql db.py app.py ./
RUN python3 -c "import db; db.init_db()"
EXPOSE 5000
CMD ["python3", "app.py"]
