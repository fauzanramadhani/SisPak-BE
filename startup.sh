#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db

# Check if there are any existing migrations
if [ -z "$(ls -A prisma/migrations)" ]; then
  echo "No migrations found. Creating initial migration..."
  npx prisma migrate dev --name init
else
  echo "Existing migrations found. Applying migrations..."
  npx prisma migrate deploy
fi

# Start the application
npm start