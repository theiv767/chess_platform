const mongoose = require('mongoose')

const GameMemento = mongoose.model('GameMemento',{
    players: String,
    date: String,
    result: Boolean

})

module.exports = GameMemento