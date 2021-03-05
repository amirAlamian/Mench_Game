const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { chatSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { StartChatUseCase } = req.scope.cradle;
    const chat = await StartChatUseCase.execute();

    if (chat) {
        return res.status(statusCodes.SUCCESS).json(
            ok('Chat Data Received Successfully', { data: chatSerializer(chat) }),
        );
    }
};
