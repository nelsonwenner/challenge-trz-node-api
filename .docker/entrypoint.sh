#!/bin/bash

cd /home/backend

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run typeorm:cli migration:run
npm run dev
