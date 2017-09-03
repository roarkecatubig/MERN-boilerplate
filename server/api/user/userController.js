// Require User Model
var User = require('./userModel');
// Require node modules
var _ = require('lodash');
// Require signToken method from auth file
var signToken = require('../../auth/auth').signToken;

// Use params as middleware to look for any routes using 'id'
// Find instances of id and add it to request object
exports.params = function(req, res, next, id) {
    // use the id and attach user to request
    User.findById(id)
        // pass everything except password
        .select('-password')
        .exec()
        .then(function(user) {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    User.find({})
        .then(function(users) {
            res.json(users);
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    // req.category already added in params
    var user = req.user;
    res.json(user);
};

exports.put = function(req, res, next) {
    // Get id of user to update
    var id = req.params.id;
    User.findById(id)
        .then(function(user) {
            // Check if user exists
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                // get the body passed
                var update = req.body;
                // Merge old user object with body
                _.merge(user, update);

                // Save changes to user
                user.save(function(err, saved) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(saved);
                        next();
                    }
                })
            }
        }, function(err) {
            next(err);
        });
};

exports.post = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) { return next(err); }

        // Sign token
        var token = signToken(user._id);
        // Pass token in json
        res.json({ token: token });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    User.findById(id)
        .then(function(user) {
            // Check if user exists
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                user.remove(function(err, removed) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(removed);
                    }
                });
            }
        }, function(err) {
            next(err);
        });
};

// return logged in user
exports.me = function(req, res) {
    // req.user added from checkUser function in userRoutes file
    res.json(req.user.toJson());
};