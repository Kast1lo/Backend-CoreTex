FROM node:25
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]