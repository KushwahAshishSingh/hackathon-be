FROM node:20.8
WORKDIR /app
COPY package.json .
RUN npm i 
COPY . .
CMD [ "npm" , "start" ] 
EXPOSE 3000