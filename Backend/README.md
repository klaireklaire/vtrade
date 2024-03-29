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
    * This file defines and sets up the configurations for the various connections to different services that we use (PostgreSQL, AWS and Sendgrid)
    * Also defines other variables like the port and logs information on our server connection status
* `db.js`
    * Uses the defined configurations in `config.js` to make a connection to our PostgreSQL database and report connection status
* `package-lock.json`
    * Package information for node
* `package.json`
    * Package information for node
* `server.js`
    * This is where the connection to the server through the app is made
* `vtrade-schema.sql`
    * This defines our SQL tables that store our data and our database schema
* `vtrade-seed.sql`
    * Defines mock data that is used for testing and developing the app
* `vtrade.sql`
    * Defines some SQL commands that are used to create/recreate the database on a PSQL shell terminal. 

## Directories

* `middleware`
    * The files in this directory define various middleware used by various routes and functions within the app. They are mostly
      for security and authentication purposes
      * `security.js`
        * Defines security middleware that ensures certain conditions are met before a function/route/api call is made. For example, the *requireAuthenticatedUser* middleware function
          is used on various api endpoints to ensure there is a verified user logged in before that call is made. This is helpful with api calls such as posting a listing where we need
          there to be a logged in user before they can post something.
* `models`
    * The files in this directory define the models that handle storing, deleting, fetching and updating data in our database.
    * Each table in our schema has its own model file to handle these data management processes
* `routes`
    * The files in this directory define the api endpoints that are used for data manipulation. They make use of the functions defined in the models files
* `utils`
    * The files in this directory define various additional utility functions that make server and database handling easier
        * `errors.js`
            * Defines the different types of errors that can be thrown depending on the situation
        * `tokens.js`
            * Helps in creating, validating and manipulating tokens that are used in various aspects of the application
