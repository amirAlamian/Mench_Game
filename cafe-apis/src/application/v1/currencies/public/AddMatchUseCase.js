const BaseUseCase = require('src/application/v1/BaseUseCase');

class AddMatchUseCase extends BaseUseCase {
    constructor ({
        AddMatchRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = AddMatchRequest;
        this.UserRepository = UserRepository;
        this.props = props;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });

        if (this.props.status === 'win') {
            user.matches++;
            user.wins++;
        } else if (this.props.status === 'lose') {
            user.matches++;
            user.loses++;
        }

        const { _id, matches, loses, wins } = user;

        return await this.UserRepository.updateUserById(_id, {
            matches,
            loses,
            wins,
        });
    }
}

module.exports = AddMatchUseCase;
