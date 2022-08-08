FROM node:16

WORKDIR /app

COPY pacakge*.json ./

#copies the local files to direectory 
COPY . . 

RUN npm install
RUN npm run client-install
RUN npm run build-client



ENV PORT=8080
ENV GOOGLE_APPLICATION_CREDENTIALS=./test-app2-177a1-firebase-adminsdk-1y1qw-31fac0bbd3.json

EXPOSE 8080

CMD ["npm","run","start"]