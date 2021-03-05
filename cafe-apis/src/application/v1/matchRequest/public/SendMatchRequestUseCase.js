const BaseUseCase = require('src/application/v1/BaseUseCase');

class SendMatchRequestUseCase extends BaseUseCase {
    constructor ({
        SendMatchRequestRequest,
        UserRepository,
        props,
        currentUser,
        MatchRequestRepository,
    }) {
        super();
        this.currentUser = currentUser;
        this.UserRepository = UserRepository;
        this.MatchRequestRepository = MatchRequestRepository;
        this.request = SendMatchRequestRequest;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findById(this.currentUser);

        if (user.username === this.props.username) {
            throw ({ message: 'REALLY ??? YOU SENDING ME YOUR OWN USERNAME ????', code: 'VALIDATION_ERROR' });
        }

        const targetUser = await this.UserRepository.findUser({ username: this.props.username });

        if (!targetUser) {
            throw ({ message: 'Target Username Not Found', code: 'NOT_FOUND' });
        }

        const matchRequest = {};
        matchRequest.reqFrom = user.username;
        matchRequest.reqTo = this.props.username;
        matchRequest.gameMode = this.props.gameMode;
        return await this.MatchRequestRepository.createMatchRequest(matchRequest);
    }
}

module.exports = SendMatchRequestUseCase;
