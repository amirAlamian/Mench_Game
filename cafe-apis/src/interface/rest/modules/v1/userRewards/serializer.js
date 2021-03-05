const serializeUserRewards = ({
    _id,
    rewardCount,
    userId,
    rewardType,
    rewardMessage,
}) => {
    return {
        _id,
        rewardCount,
        userId,
        rewardType,
        rewardMessage,
    };
};

module.exports = {
    serializeUserRewards,
};
