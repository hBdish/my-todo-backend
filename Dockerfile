#FROM node:18 as build
#LABEL authors="maksim"
#
#RUN mkdir /app && mkdir /src
#WORKDIR /src
#
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#
#FROM node:18 as app
#EXPOSE 6100
#COPY --from=build ./src/dist/* /app/
#CMD ["node", "app/main.js"]
#

FROM node:18 as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/auth/src/main.js" ]