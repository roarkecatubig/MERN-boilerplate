// Require Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Set Schema to mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema
var RecipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

// Export as model
module.exports = RecipientSchema;