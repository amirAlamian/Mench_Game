const statusCodes = require('src/interface/rest/constants/statusCodes');
const ok = require('src/interface/rest/responses/ok');

const { chatSerializer } = require('../../serializer');

module.exports = async (req, res) => {
    const { SendChatUseCase } = req.scope.cradle;
    const chat = await SendChatUseCase.execute();


    return res.status(statusCodes.SUCCESS).json(
        ok('Chat Data Received Successfully', { data: chatSerializer(chat) }),
    );
};
