const BaseUseCase = require('src/application/v1/BaseUseCase');

class AddScoreUseCase extends BaseUseCase {
    constructor ({
        AddScoreRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = AddScoreRequest;
        this.UserRepository = UserRepository;
        this.props = props;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();

        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        user.score += Number.parseInt(this.props.score);
        user.weeklyScoreChange = user.score - user.lastWeekScore;
        const { _id, score, weeklyScoreChange } = user;
        return await this.UserRepository.updateUserById(_id, {
            score,
            weeklyScoreChange,
        });
    }
}

module.exports = AddScoreUseCase;
