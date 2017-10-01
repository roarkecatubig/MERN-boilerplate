// Require Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Set Schema to mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema
var RecipientSchema = new Schema({
    email: String,
    // Default to false, do not need to set value when adding survey
    responded: { type: Boolean, default: false }
});

// Export as model
module.exports = RecipientSchema;