FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# création d'un utilisateur non-root
RUN adduser -D appuser

# exécution du conteneur avec cet utilisateur
USER appuser

EXPOSE 8000

CMD ["uvicorn","main:app","--proxy-headers","--host","0.0.0.0","--port","8000"]