const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_photo_url: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['instructor', 'admin', 'student']
    }
});

userSchema.pre('save', function(next){
    if ( ! this.isModified( 'password' ) ) next();
    this.password = bcrypt.hashSync(this.password, 8);
    next()
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password );
};

const User = mongoose.model('User', userSchema);

module.exports = User;