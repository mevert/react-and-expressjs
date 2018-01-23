# Express API
This example demonstrates a way to build modern REST API with Express.js.

### Development ###
- `npm i` install packages
- `npm test` to run tests
- `npm run test:watch` to run tests using mocha with watch
- `npm run start` to run server. Note: you can specify custom environment variables from .env file 
- `npm run start:dev` to run server in watch mode with nodemon
- `npm run lint` to run eslin

### Docker ###
- `docker build --build-arg API_HTTP_PORT=3001 -t api .`to build docker image
- `docker run -p 3001:3001 -d api` to run api in localhost:3001

### REST Endpoints ###
- Resturant opening hours
  - `GET` http://localhost:3001/api/restaurants/:restaurantId/hours
    - In this example API restaurantId can be a random string