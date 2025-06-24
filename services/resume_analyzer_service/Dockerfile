# Use Python 3.10 as the base image
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the src directory into the container
COPY src/ /app/src/

# Install dependencies
RUN pip install fastapi uvicorn

# Expose the port the FastAPI app will run on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
# --host 0.0.0.0 makes the app accessible from outside the container
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]