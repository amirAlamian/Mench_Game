const BaseUseCase = require('src/application/v1/BaseUseCase');

class SendChatUseCase extends BaseUseCase {
    constructor ({
        SendChatRequest,
        props,
        ChatRepository,
        UserRepository,
        currentUser,
    }) {
        super();
        this.request = SendChatRequest;
        this.ChatRepository = ChatRepository;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.props = props;
    }
    execute = async () => {
        await super.execute();


        const user = await this.UserRepository.findUser({ _id: this.currentUser });

        const chatData = {
            date: Date.now(),
            user: user.username,
            message: this.props.message,
        };

        const chat = await this.ChatRepository.findChatById(this.props.chatId);

        if (!chat) {
            throw {
                message: 'chat not found',
                code: 'NOT_FOUND',
            };
        }

        chat.chats.push(chatData);
        return await this.ChatRepository.updateChatById(chat._id, {
            chats: chat.chats,
        });
    }
}

module.exports = SendChatUseCase;
