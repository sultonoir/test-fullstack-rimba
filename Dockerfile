# Gunakan Node.js sebagai base image
FROM node:18-alpine

# Tentukan working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file aplikasi
COPY . .

# Ekspos port untuk aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
