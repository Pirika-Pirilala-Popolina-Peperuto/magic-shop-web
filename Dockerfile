FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ["package.json", "pnpm-lock.yaml", "./"]

# install project dependencies
RUN pnpm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN pnpm build

EXPOSE 80
CMD [ "http-server", "dist" ]
