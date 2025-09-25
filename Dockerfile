# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat \
    git

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Set environment variables
ENV PYTHON=/usr/bin/python3
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files from root path
COPY ./package*.json ./

# Install dependencies with compatibility flags
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code from root path
COPY . ./

# Build application for production
RUN ng build

# Production stage with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy built application from builder stage
COPY --from=builder /app/dist/* ./

# Create nginx configuration for Angular routing
RUN echo 'events { worker_connections 1024; } \
http { \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    sendfile on; \
    keepalive_timeout 65; \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    server { \
        listen 80; \
        server_name localhost; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { \
            try_files $$uri $$uri/ /index.html; \
        } \
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$$ { \
            expires 1y; \
            add_header Cache-Control "public, immutable"; \
        } \
        location /api/ { \
            # Proxy API calls if needed \
            # proxy_pass http://backend:8080; \
        } \
    } \
}' > /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
