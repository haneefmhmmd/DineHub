const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')


// Restaurant properties
const restaurantSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        default: 2
    },
    name: {
        type: String,
        required: [true, 'Please provide your full name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validator: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Min length of password is 6']
    },
    url: {
        type: String,
        default: ''
    },
    bannerImageHref: {
        type: String,
        default: ''
    },
    logoHref: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    businessHours: {
        type: String,
        default: ''
    },
    cuisine: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    about: {
        type: String,
        default: ''
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }]
})

// salting and hashing the password
restaurantSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Handle login
restaurantSchema.statics.login = async function (email, password) {
    const restaurant = await this.findOne({ email });
    if (restaurant) {
        const isAuth = await bcrypt.compare(password, restaurant.password);
        if (isAuth) {
            return restaurant;
        }
        throw new Error('Incorrect password');
    }
    else {
        throw new Error('Email not found');
    }
}

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;