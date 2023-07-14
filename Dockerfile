FROM node:18-alpine3.17 AS deps

RUN apk add --no-cache libc6-compat
RUN mkdir -p /home/app
RUN apk update

WORKDIR /home/app

COPY . .
COPY package.json .

RUN npm i --omit=dev

FROM node:18-alpine AS builder
WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

COPY --from=builder /app ./
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=backend:nodejs /app ./

USER backend

EXPOSE 4000

ENV PORT 4000

# ENTRYPOINT ["nodemon", "index.js"]
CMD ["npm", "start"]
