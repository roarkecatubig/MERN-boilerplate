//Set variable name as a Router to be called in server.js
//Use variable name instead of app
var router = require('express').Router();

// api router will mount other routers
// for all our resources
// Each resource directory should have a 'resource'Routes.js file with router ready to go
router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/posts', require('./post/postRoutes'));
router.use('/surveys', require('./survey/surveyRoutes'));

//Export Router to be used in server.js
module.exports = router;