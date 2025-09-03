FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
