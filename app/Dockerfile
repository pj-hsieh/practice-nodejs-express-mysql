FROM node:alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
FROM base AS prod
ENV NODE_ENV=production 
RUN echo "production mode"
RUN npm ci 
COPY . .
CMD [ "npm", "run", "start" ]

FROM base AS dev 
ENV NODE_ENV=development 
RUN echo "development mode"
RUN npm install -g nodemon && npm install 
COPY . .
CMD [ "npm", "run", "dev" ]