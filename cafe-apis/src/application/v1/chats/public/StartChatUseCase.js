const BaseUseCase = require('src/application/v1/BaseUseCase');

class StartChatUseCase extends BaseUseCase {
    constructor ({
        StartChatRequest,
        props,
        currentUser,
        ChatRepository,
        UserRepository,
    }) {
        super();
        this.request = StartChatRequest;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.ChatRepository = ChatRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();


        const user = await this.UserRepository.findUser({ _id: this.currentUser });

        if (user.username === this.props.username) {
            throw { message: 'REALLY ??? YOU SENDING ME YOUR OWN USERNAME ????', code: 'VALIDATION_ERROR' };
        }

        let chat = await this.ChatRepository.findChatByUsernames(user.username, this.props.username);

        if (!chat) {
            chat = {};
            chat.userA = user.username;
            chat.userB = this.props.username;
            chat.chats = [];
            await this.ChatRepository.createChat(chat);
        }

        return chat;
    }
}

module.exports = StartChatUseCase;
