#!/bin/sh

# Tunggu database siap
./wait-for-it.sh db npm run migrate && npm start