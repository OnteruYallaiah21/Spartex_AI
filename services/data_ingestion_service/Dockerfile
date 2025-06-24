FROM python:3.10-slim-buster

WORKDIR /app

COPY src/ /app/src/

RUN pip install fastapi uvicorn python-multipart # python-multipart is needed for file uploads

# Create the directory for uploaded files
RUN mkdir -p /app/uploaded_files

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]