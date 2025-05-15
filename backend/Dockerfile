# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Create an .env file if it doesn't exist
RUN if [ ! -f .env ]; then touch .env; fi

# Expose the port the app will run on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "dev"]