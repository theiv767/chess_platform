const mongoose = require('mongoose')

const User = mongoose.model('User',{
    username: String,
    email: String,
    password: String,
    ratingrapid: Number,
    ratingblitz: Number,
    ratingbullet: Number,
    name: String,
    status: String,
    picture: String
})

module.exports = User