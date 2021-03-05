const mongoose = require('mongoose');

const RewardsDataSchema = mongoose.Schema({
    inviteReward: {
        type: {
            type: Number,
        },
        default: 0,
    },
}, { timestamps: true });


// Converting This To JSON Object
RewardsDataSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

module.exports = mongoose.model('rewardsDataModel', RewardsDataSchema, 'rewardsData');
