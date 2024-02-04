FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma db seed

EXPOSE 3000

CMD ["npm","run","dev"]