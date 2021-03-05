const BaseUseCase = require('src/application/v1/BaseUseCase');

class RejectFriendRequestUseCase extends BaseUseCase {
    constructor ({
        RejectFriendRequestRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = RejectFriendRequestRequest;
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

        const pendingFriends = targetUser.pendingFriends.filter(friend => {
            return friend !== this.props.user.username;
        });
        const requestFriends = this.props.user.requestFriends.filter(friend => {
            return friend !== this.props.username;
        });
        await this.UserRepository.updateUserById(targetUser._id, {
            pendingFriends,
        });
        return await this.UserRepository.updateUserById(this.props.user._id, {
            requestFriends,
        });
    }
}

module.exports = RejectFriendRequestUseCase;
