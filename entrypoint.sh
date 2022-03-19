#!/usr/bin/env bash

npx prisma migrate deploy
node dist/server.js
