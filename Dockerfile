# Use a node base image with build tools
FROM node:lts-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /src

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

# Build the application
RUN npm run build

# Create a new stage for the runtime
FROM node:lts-alpine

WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /src/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]