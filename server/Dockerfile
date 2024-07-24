FROM node 

WORKDIR /mern_app

COPY package*.json /mern_app/

RUN npm install

RUN npm install -g nodemon

COPY . /mern_app/

EXPOSE 8083

CMD ["npm", "start"]