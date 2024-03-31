const mongoose = require('mongoose')

// Menu properties
const menuSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please provide category'],
    },
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    image: {
        type: String,
        required: [true, 'Please provide image'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
    },
})

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;