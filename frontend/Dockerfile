# ===== STAGE 1: build =====
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2: production =====
FROM node:20-alpine

WORKDIR /app

# копируем только результат сборки
COPY --from=builder /app/.output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]