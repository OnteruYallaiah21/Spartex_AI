# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
# npm cache clean --force is often not needed if package-lock.json is in sync
RUN npm ci

# Copy the rest of your application code
# Ensure index.html is at the root of your frontend project relative to the Dockerfile
COPY . .
# If you have specific folders you want to copy, list them explicitly:
# COPY public ./public
# COPY src ./src
# COPY index.html ./
# COPY vite.config.js ./

# Build the React application for production
# This command generates the optimized static files into the 'dist' directory
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
# Ensure your nginx.conf is in the same directory as this Dockerfile
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React application from the 'build' stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default HTTP port)
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]