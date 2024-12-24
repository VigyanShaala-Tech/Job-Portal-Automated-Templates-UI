# # Dockerfile for React App
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . ./

# # Expose the port the app runs on
# EXPOSE 3000

# # Default command to run the application
# CMD ["npm", "start"]



# Stage 1: Build the React app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the app
COPY . ./
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM nginx:alpine

# Copy the build output to Nginx's default public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
