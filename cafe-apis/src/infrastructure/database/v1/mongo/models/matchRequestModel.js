const mongoose = require('mongoose');

// Schema
const MatchRequestSchema = mongoose.Schema({
    reqFrom: {
        type: String,
    },
    reqTo: {
        type: String,
    },
    gameMode: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    matchId: {
        type: String,
    },
}, { timestamps: true });
MatchRequestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 6000 });


// Converting This To JSON Object
MatchRequestSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};


module.exports = mongoose.model('matchRequestModel', MatchRequestSchema, 'matchRequest');
