# Use a more recent version of Node.js
FROM node:18-slim

# Install OpenSSL and PostgreSQL client
RUN apt-get update && apt-get install -y openssl postgresql-client

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy the wait-for-it script
COPY wait-for-it.sh ./

# Make sure the script is executable
RUN chmod +x wait-for-it.sh

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Expose the port your app runs on
EXPOSE 3000

# Create a startup script
COPY startup.sh .
RUN chmod +x startup.sh

# Run the startup script
CMD ["./startup.sh"]