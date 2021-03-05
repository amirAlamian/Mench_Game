const mongoose = require('mongoose');

const UserRewardsSchema = mongoose.Schema({
    rewardType: {
        type: String,
    },
    userId: {
        type: String,
    },
    rewardMessage: {
        type: String,
    },
    rewardCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

UserRewardsSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

module.exports = mongoose.model('userRewardModel', UserRewardsSchema, 'userRewards');
