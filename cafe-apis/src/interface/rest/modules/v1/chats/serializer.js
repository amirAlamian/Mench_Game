const chatSerializer = ({
    _id,
    userA,
    userB,
    chats,
}) => {
    return {
        _id,
        userA,
        userB,
        chats,
    };
};

module.exports = {
    chatSerializer,
};
