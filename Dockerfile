FROM node
RUN mkdir /home/node/mutodo-auth 
WORKDIR /home/node/mutodo-auth
COPY src package.json .
RUN npm i
RUN --mount=type=secret,id=database-url echo "DATABASE_URL=$(cat /run/secrets/database-url)" > .env
RUN npx prisma generate
RUN npm run build
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
