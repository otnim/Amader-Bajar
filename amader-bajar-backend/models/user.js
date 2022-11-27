const Joi = require('joi');
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    phone: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    userType: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
        default: "customer"
    }
});

//we wanna add a method in this schema
//by doing this our User object will have a method named generateAuthToken
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email, userType: this.userType, phone: this.phone }, config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(2).max(255).required(),
        phone: Joi.string().min(2).max(20).required(),
        userType: Joi.string().min(2).max(50)
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
