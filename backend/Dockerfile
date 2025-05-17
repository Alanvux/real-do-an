# Backend Dockerfile for TypeScript
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Create an .env file if it doesn't exist
RUN if [ ! -f .env ]; then touch .env; fi

# Build TypeScript project
RUN npm run build

# Expose the port the app will run on
EXPOSE 4000

# Command to run the application in development mode (with hot reloading)
CMD ["npm", "run", "dev"]