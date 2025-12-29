FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Expose port 5050
EXPOSE 5050

# Start the server
CMD ["node", "dist/server.js"]