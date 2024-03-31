const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const menuRoutes = require('./routes/menuRoutes')


app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors());

// database connection
const connectionString = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(connectionString)
    .then(res => app.listen(process.env.PORT))
    .catch(err => console.log(err))

// Use routes
app.use(userRoutes, restaurantRoutes, menuRoutes)

// Listening port
const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));