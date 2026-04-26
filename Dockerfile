FROM node:20

WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY=0

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY . .

EXPOSE 8000

CMD ["node", "src/index.js"]