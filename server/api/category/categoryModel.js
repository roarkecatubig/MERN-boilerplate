// Require Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Set Schema to mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Export as model
module.exports = mongoose.model('category', CategorySchema);