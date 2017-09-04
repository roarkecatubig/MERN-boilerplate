// Require Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Set Schema to mongoose Schema
const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');

// Create new Schema
const SurveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateSent: Date,
    lastResponded: Date
});

// Export as model
module.exports = mongoose.model('survey', SurveySchema);