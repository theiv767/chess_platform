const mongoose = require('mongoose')

const User = mongoose.model('User',{
    username: String,
    email: String,
    password: String,
    ratingrapid: Number,
    ratingblitz: Number,
    ratingbullet: Number

})

module.exports = User