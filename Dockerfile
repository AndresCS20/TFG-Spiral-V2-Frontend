# ---- Builder stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx ng build

# ---- Dev stage ----
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]

# ---- Runtime stage ----
FROM nginx:alpine

# Non-root preparation: allow nginx to write pid, cache, and temp files
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/spiral-v2-frontend/ /usr/share/nginx/html/

# Switch to non-root user after permission setup
USER nginx
EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
