# Express.js API
This is an example boilerplate that can be used to build modern REST API with Express.js.

## Development ##
- `npm i` install packages
- `npm test` to run tests
- `npm run test:watch` to run tests using mocha with watch
- `npm run start` to run server. Note: you can specify custom environment variables from .env file 
- `npm run start:dev` to run server in watch mode with nodemon
- `npm run lint` to run eslin

## Database ##
- `docker run --name testdb -p 27017:27017 -d mongo` docker command to run mongodb

## TODO / checklist ##
- validation/serialization for models.js
- custom error messages for client