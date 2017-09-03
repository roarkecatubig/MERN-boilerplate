// Require Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Require bcrpty to hash password
var bcrypt = require('bcrypt');
// Set Schema to mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    // dont store the password as plain text
    password: {
        type: String,
        required: true
    }
});

// middleware that will run before a document
// is created
UserSchema.pre('save', function(next) {

    if (!this.isModified('password')) return next();
    // encrypt password
    this.password = this.encryptPassword(this.password);
    next();
})


UserSchema.methods = {
    // check the passwords on signin
    authenticate: function(plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },
    // hash the passwords
    encryptPassword: function(plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            // generate salt and encrypt it
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    },
    toJson: function() {
        // converting document to object
        var obj = this.toObject();
        // delete password property to avoid sending back hashed password
        delete obj.password;
        return obj;
    }
};

// Export as model 
module.exports = mongoose.model('user', UserSchema);