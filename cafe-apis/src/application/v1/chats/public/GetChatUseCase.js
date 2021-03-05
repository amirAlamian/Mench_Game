const BaseUseCase = require('src/application/v1/BaseUseCase');

class GetChatUseCase extends BaseUseCase {
    constructor ({
        GetChatRequest,
        props,
        ChatRepository,
    }) {
        super();
        this.request = GetChatRequest;
        this.ChatRepository = ChatRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();


        const chat = await this.ChatRepository.findChatById(this.props.chatId);

        if (!chat) {
            throw {
                message: 'chat not found',
                code: 'NOT_FOUND',
            };
        }

        return chat;
    }
}

module.exports = GetChatUseCase;
