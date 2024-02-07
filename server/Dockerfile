FROM node:18-alpine

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/

RUN npm install
RUN npm install -g ts-node
RUN npm install -g prisma

COPY . .

EXPOSE 3000

CMD ["./startup.sh"]