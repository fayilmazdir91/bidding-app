FROM node:19.7.0
WORKDIR /bidding-app-frontend
ENV PATH /bidding-app-frontend/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install # -g npm@8.9.0
COPY . .
EXPOSE 3000
CMD ["npm", "start"]