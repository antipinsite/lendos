# ===== STAGE 1 =====
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2 =====
FROM node:20

WORKDIR /app

COPY --from=builder /app ./

RUN npm prune --omit=dev

EXPOSE 1337

CMD ["npm", "run", "start"]