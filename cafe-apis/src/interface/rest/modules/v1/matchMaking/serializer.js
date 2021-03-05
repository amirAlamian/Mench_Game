const matchMakingSerializer = ({
    _id,
    players,
    maxPlayerCount,
    gameMode,
    isGameStarted,
}) => {
    return {
        _id,
        players,
        maxPlayerCount,
        gameMode,
        isGameStarted,
    };
};

module.exports = {
    matchMakingSerializer,
};
