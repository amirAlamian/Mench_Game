const mongoose = require("mongoose");

//Schema
const Matchmaking = mongoose.Schema({
    players: {
        type: Array
    },
    maxPlayerCount:{
        type: Number
    },
    gameMode: {
        type: String
    },
    isGameStarted: {
        type: Boolean
    },
}, { timestamps: true });
Matchmaking.index({ createdAt: 1 }, { expireAfterSeconds: 600 });


//Converting This To JSON Object
Matchmaking.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

//Converting This To Gmae Object
Matchmaking.methods.toGameData = function () {
    var obj = this.toObject();
    obj.actions = [];
    delete isGameStarted;
    delete maxPlayerCount;
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

module.exports = mongoose.model('matchMakingModel', Matchmaking, 'matchMaking');

