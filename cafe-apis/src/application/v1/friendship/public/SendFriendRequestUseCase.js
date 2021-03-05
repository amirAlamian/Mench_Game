const BaseUseCase = require('src/application/v1/BaseUseCase');

class SendFriendRequestUseCase extends BaseUseCase {
    constructor ({
        SendFriendRequestRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = SendFriendRequestRequest;
        this.UserRepository = UserRepository;
        this.props = props;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();

        const targetUser = await this.UserRepository.findUser({ username: this.props.username });

        if (!targetUser) {
            throw { message: 'Target Username Not Found', code: 'NOT_FOUND' };
        }

        targetUser.requestFriends.push(this.props.user.username);
        this.props.user.pendingFriends.push(this.props.username);

        await this.UserRepository.updateUserById(targetUser._id, {
            requestFriends: targetUser.requestFriends,
        });
        return await this.UserRepository.updateUserById(this.props.user._id, {
            pendingFriends: this.props.user.pendingFriends,
        });
    }
}

module.exports = SendFriendRequestUseCase;
