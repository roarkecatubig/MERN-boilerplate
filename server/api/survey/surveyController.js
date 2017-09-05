// Require Category Model
var Survey = require('./surveyModel');
// Require node modules
var _ = require('lodash');

// Use params as middleware to look for any routes using 'id'
// Find instances of id and add it to request object
exports.params = function (req, res, next, id) {
    // use the id and attach category to request
    Survey.findById(id)
        .then(function (survey) {
            if (!survey) {
                // No category found send to error handler
                next(new Error('No survey with that id'));
            } else {
                // If id exists
                // attach survey to request category object
                req.survey = survey;
                // Next will go to the request which is called
                next();
            }
        }, function (err) {
            // error handling
            next(err);
        });
};

// exports.get = function(req, res, next) {
//     Category.find({})
//         .then(function(categories) {
//             res.json(categories);
//         }, function(err) {
//             next(err);
//         });
// };

// exports.getOne = function(req, res, next) {
//     // req.category already added in params
//     var category = req.category;
//     res.json(category);
// };

// exports.put = function(req, res, next) {
//     var category = req.category;

//     var update = req.body;

//     _.merge(category, update);

//     category.save(function(err, saved) {
//         if (err) {
//             next(err);
//         } else {
//             res.json(saved);
//         }
//     })
// };

exports.post = function (req, res, next) {
    // Set values from request body, in correct order
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
        // use ES6 syntax to define values
        // no need to do title: title, subject: subject etc.
        title,
        subject,
        body,
        // Recipient is a sub-document is a little different
        // Recipient is an array of objects
        // recipients.split returns an array of strings
        // map - for every email address with the property email with the value of trimmed email
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        // Get the user creating the survey
        _user: req.user.id,
        dateSent: Date.now()
    })


    // Survey.create(newSurvey)
    //     .then(function (survey) {
    //         res.json(survey);
    //     }, function (err) {
    //         next(err);
    //     });
};

// exports.delete = function(req, res, next) {
//     req.category.remove(function(err, removed) {
//         if (err) {
//             next(err);
//         } else {
//             res.json(removed);
//         }
//     });
// };