FROM node:latest
# Env
ENV TIME_ZONE=Europe/Bulgaria
ENV ENV_NAME dev
ENV NODE_ENV dev
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package*.json file to work directory
COPY package.json .
COPY package-lock.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# Install pm2
RUN npm install pm2 -g
# Start
CMD [ "pm2-runtime", "npm", "--", "start" ]

EXPOSE 3000