// Require Post Model
var Post = require('./postModel');
// Require node modules
var _ = require('lodash');

// Use params as middleware to look for any routes using 'id'
// Find instances of id and add it to request object
exports.params = function(req, res, next, id) {
    // use the id and attach post to request
    Post.findById(id)
        // populate creates models relationships by 
        // finding the fields to populate as stated in argument
        // collects ObjectId's by going to the 'ref' stated in the Post Model
        // attaches ObjectId to the relative field
        // only used at calltime, not stored in db
        .populate('author categories')
        // call exec as populate does not return a promise
        .exec()
        .then(function(post) {
            if (!post) {
                // No post found send to error handler
                next(new Error('No post with that id'));
            } else {
                // If post exists
                // attach post to request post object
                req.post = post;
                next();
            }
        }, function(err) {
            // error handling
            next(err);
        });
};

exports.get = function(req, res, next) {
    Post.find({})
        .populate('author categories')
        .exec()
        .then(function(posts) {
            // Send all posts back
            res.json(posts);
        }, function(err) {
            // error handling
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    // req.post already added in params
    var post = req.post;
    res.json(post);
};

exports.put = function(req, res, next) {
    var post = req.post;

    var update = req.body;

    _.merge(post, update);

    post.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    // Get body passed
    var newpost = req.body;
    // Get Author
    newpost.author = req.user._id;
    Post.create(newpost)
        .then(function(post) {
            res.json(post);
        }, function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};