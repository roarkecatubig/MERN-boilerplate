// Require Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Set Schema to mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema
var PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    text: {
        type: String,
        required: true
    },
    // id from the user
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // array of ids of categories
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }]
});

// Export as model
module.exports = mongoose.model('post', PostSchema);