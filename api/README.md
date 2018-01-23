# Express.js API
This example project demonstrates a way to build modern REST API with Express.js. The project includes also some example tests.

## Development ##
- `npm i` install packages
- `npm test` to run tests
- `npm run test:watch` to run tests using mocha with watch
- `npm run start` to run server. Note: you can specify custom environment variables from .env file 
- `npm run start:dev` to run server in watch mode with nodemon
- `npm run lint` to run eslin

## REST Endpoints ##
- Resturant opening hours
  - `GET` http://localhost:3001/api/restaurants/:restaurantId/hours
    - In this example API restaurantId can be a random string