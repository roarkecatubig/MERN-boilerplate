# MERN Boilerplate

## Setup

Globally install nodemon, mongoose, mocha, grunt, grunt-build-control

```npm install -g nodemon mongoose mocha```
```sudo npm install -g nodemon mongoose mocha```

Install node modules

```npm install i```

## Start Sever
 ```npm start```

## Run Mongo Db

- Go to Terminal and run
 ```mongod```
- Open 2nd Terminal and run
 ```mongo```
## Setup Heroku
1. Go to project directory, open terminal and run
 ```heroku create [projectname]``

## .gitignore amendments

1. Go to .gitignore
2. Add /server/config to hide folder when commiting to github

1. server/config/development.js
2. server/config/production.js
3. server/config/testing.js
    - Change the db url as required

## Config Amendments Required

Go to
1. server/config/config.js
    - Inside config object, change the Secrets JWT value

Go to

1. server/config/development.js
2. server/config/production.js
3. server/config/testing.js
    - Change the db url as required

## Gruntfile amendments Required

1. Go to Gruntfile.js
2. Update Pages remote value to github repo
3. Update Heroku remote to value of heroku app

## package.json amendments Required

1. Update name value
2. Update description value
3. Look at any packages that need updating

## App flow
1. Starts in index.js
    1. Consumes config.js, server.js & logger
    2. Listens to port number set in config file
2. Then server/config/config.js
    1. Config object sets Environment Variables, port number, token & token expire time
    2. Checks Node Environment
    3. Depending on the Evironment, logging, seeding, and db url
3. Then server/util/logger.js
    1. Alternative way to log to console with colours and prefixes
4. Then server/server.js
    1. Connects to Mongo database
    2. Seeds database if seed is set to true in config
    3. Sets up Middleware
    4. Sets up the /api route
    5. Sets up the /auth route
    6. Use Error Handler
5. Then server/middleware/appMiddleware.js
    1. Require morgan for logging
    2. Requires bodyparser for parsing incoming request bodies
    3. Require cors & method-override
6. Then server/middleware/err.js
    1. Handles errors in the server
    2. Posts to console
7. Then server/api/api.js
    1. Setups all routes within the /api route
8. Then server/auth/auth.js
    1. Contains authorisation methods
        - Decodes token
        - Check user of token
        - Verifying user exists
        - Verifying user has access to controller method
        - Sign token when user logs in
9. Then server/api/[route]/[routeModel]
    1. Setup Schema for route
    2. Can add middleware before document is run 
    3. Can add methods to be called in the controller
    4. Can add an array of items from another model inside schema by
        ``` categories: [{type: Schema.Types.ObjectId ref: 'category' }] ```
    5. Can add an object of another model inside schema by
         ``` author: {type: Schema.Types.ObjectId,ref: 'user', required: true }, ```
10. Then server/api/[route]/[routeRoutes]
    1. Setting up router for api routes
    2. Either consume createRoutes boilerplate
    3. Or create own routes to controller
11. Then server/api/[route]/[routeController]
    1. Business Logic
    2. Export methods for each type of request made to the route
    3. Use params as middleware to look for any routes using 'id'
    4. Find instances of id and add it to request object
12. Then server/auth/router.js
    1. Setting up router for auth route
13. Then server/auth/controller.js
    1. /auth/signin route
    2. Add token to localstorage 

## Adding new route
1. Go to server/api
    1. Add new folder with [router] name
2. Go to server/api/[router]
    1. Add 3 files
        - [router]Controller.js
        - [router]Model.js
        - [router]Routes.js
3. Go to server/api/[router]/[router]Model
    1. Create Schema
    2. Rename Schema appropriately
    3. Export Model
        - Name model appropriately for ref in model relationships
        - Export the Schema
4. Go to server/api/[router]/[router]Routes
    1. Setup all routes within [router]
    2. Require the controller
    3. Require the createRoutes file
        - If using the boilerplate
    4. If using the createRoutes file call function and pass controller and router
        - Or else, setup routes inline, use createRoutes as a template and add any auth if neccessary
5. Go to server/api/[router]/[router]Controller
    1. Add business logic to all methods referened in [router]Routes file
    2. Use other controllers as a reference
6. Add dummy data to seed
7. Test in Postman
    1. On sign in, a token is returned
    2. When making an authenticated call
        - Add authorization as a header
        - the value will be Bearer whatevertokenis

## Deploying to heroku

1. Ensure master branch is up to date 
2. Go to the heroku app in the heroku dashboard
3. Go to the overview tab
4. Click on 'Configure Add-ons' button
5. Search for mlab
6. Select sandbox-free
7. Go to terminal inside project directory
8. Run ```heroku config --app [projectname] | grep MONGODB_URI ``` to get db url
    1. Or go to heroku dashboard
    2. Go to settings
    3. Click reveal config variables
    4. Edit the MONGODB_URI to get full string
9. Open up Robomongo/other software. 
10. Robomongo
    1. Clone existing connection
    2. Update name
    3. Check address on mlab and update
    4. Check port and update
    5. Go to Authentication tab
    6. update dbname
    7. Update username
    8. Update password (up to @ symbol)
11. Go back to heroku dashboard
12. Go to Settings
13. Click on reveal config variables
14. Add Variables
    1. NODE_ENV
        - production
    2. JWT
        - Go here to generate https://www.randomcodegenerator.com/en/generate-codes@pronounceable#result
    3. 
15. Run ```npm run heroku``` to deploy

## TODO

- [ ] Look into using foreman
- [ ] Using passport
- [ ] uuid/v4
- [ ] enum inside of type, Schema
- [ ] paginate
- [ ] elastic search
- [ ] pubnub
- [ ] nginX
