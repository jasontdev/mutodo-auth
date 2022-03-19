FROM node
RUN git clone https://github.com/jasontdev/mutodo-auth.git /home/node/mutodo-auth
WORKDIR /home/node/mutodo-auth
RUN npm i
COPY .env.production .env
RUN npx prisma generate
RUN npm run build
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
