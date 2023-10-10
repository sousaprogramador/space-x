FROM node:18.15.0-slim
WORKDIR /app

# Copy package and install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Install dependencies
RUN apt-get update --yes && apt-get install --yes \
		python3 \
		python3-pip \
		libcurl4 \
		libcurl4-openssl-dev \
		jq

# Copy source app
COPY . /app/

EXPOSE 9000
CMD [ "npm", "run", "start" ]
