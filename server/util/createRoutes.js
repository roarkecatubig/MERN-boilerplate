// require auth file for auth methods
var auth = require('../auth/auth');

var checkUser = [
    // Check the user has valid token
    auth.decodeToken(),
    // Add user to request object
    auth.getFreshUser()
];

// Boilerplate for generic routes
module.exports = function(controller, router) {
    router.param('id', controller.params);

    // Define routes
    // All requests to '/api/router'
    // Go to relative controller and selected method
    router.route('/')
        .get(controller.get)
        // add auth
        .post(checkUser, controller.post)

    router.route('/:id')
        .get(controller.getOne)
        // add auth
        .put(checkUser, controller.put)
        // add auth
        .delete(checkUser, controller.delete)
};