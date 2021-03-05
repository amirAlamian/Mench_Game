const gameplaySerializer = ({
    players,
    gameMode,
    actions,
}) => {
    return {
        players,
        gameMode,
        actions,
    };
};

module.exports = {
    gameplaySerializer,
};
