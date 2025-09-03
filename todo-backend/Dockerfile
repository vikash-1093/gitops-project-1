FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
