# Vtrade backend documentation

Vtrade backend is a server that connects to a database that stores and maintains data for vtrade users

## Tech/Framework used

**Built with**:
- PostgreSQL
- AWS s3
- Express api
- Sendgrid api

## Installation and running
To run the backend server locally, clone this repository and install node dependencies by running the command `npm install`
Start the server by running `npm start`.
The backend is run using nodemon so any changes made to the code are automatically compiled and applied to the server even when running.

## Files
* `.env` 
    * File that contains secret keys and passwords (is not pushed to remote git repository)
* `.env.template` 
    * A template for the .env file that can be used to define the required variables in the .env file
* `.gitignore` 
    * Git ignore file
* `app.js` 
    * This file combines most of the logic of our backend in one place. It defines:
        * The base endpoints for all the routes in our express api
        * The dependencies and technologies that our backend server and database use
* `config.js` 
* `db.js`
* `package-lock.json`
* `package.json`
* `server.js`
* `vtrade-schema.sql`
* `vtrade-seed.sql`
* `vtrade.sql`

## Directories

* `middleware`
* `models`
* `routes`
* `utils`
