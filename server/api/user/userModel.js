// Require Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Require bcrpty to hash password
const bcrypt = require('bcrypt-nodejs');
// Set Schema to mongoose Schema
const Schema = mongoose.Schema;

// Create new Schema
const UserSchema = new Schema({
    local: {
        email: String,
        password: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    credits: { type: Number, default: 0 }
});

// // middleware that will run before a document
// // is created
// UserSchema.pre('save', function(next) {

//     if (!this.isModified('password')) return next();
//     // encrypt password
//     this.password = this.encryptPassword(this.password);
//     next();
// })


UserSchema.methods = {
    // check the passwords on signin
    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    // hash the passwords
    validPassword: function (password) {
        return bcrypt.compareSync(password, this.local.password);
    },
    toJson: function () {
        // converting document to object
        var obj = this.toObject();
        // delete password property to avoid sending back hashed password
        delete obj.password;
        return obj;
    }
};

// Export as model 
module.exports = mongoose.model('user', UserSchema);