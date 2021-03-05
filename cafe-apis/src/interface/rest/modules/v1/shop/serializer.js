const shopSerializer = ({
    userId,
    dices,
    avatars,
    powerUps,
    nuts,
    currencyItems,
}) => {
    return {
        userId,
        dices,
        avatars,
        powerUps,
        nuts,
        currencyItems,
    };
};

module.exports = {
    shopSerializer,
};
