const matchRequestSerializer = ({
    _id,
    reqFrom,
    reqTo,
    gameMode,
    status,
    matchId,
}) => {
    return {
        _id,
        reqFrom,
        reqTo,
        gameMode,
        status,
        matchId,
    };
};

module.exports = {
    matchRequestSerializer,
};
