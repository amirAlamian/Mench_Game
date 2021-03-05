const BaseUseCase = require('src/application/v1/BaseUseCase');

class UseRewardsUseCase extends BaseUseCase {
    constructor ({ UseRewardsRequest, props, currentUser, UserRepository, UserRewardRepository }) {
        super();
        this.UseRewardsRequest = UseRewardsRequest;
        this.currentUser = currentUser;
        this.UserRewardRepository = UserRewardRepository;
        this.UserRepository = UserRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        const rewards = await this.UserRewardRepository.findUserRewardsById(this.props.rewardId);

        if (!rewards) {
            throw {
                code: 'NOT_FOUND',
                message: 'Reward Not Found',
            };
        }

        user.score += +rewards.rewardCount;
        await this.UserRewardRepository.deleteUserRewardById({ _id: this.props.rewardId });
        // user.markModified('score');
        const modifiedUser = await this.UserRepository.updateUserById(user._id, { score: user.score });
        return modifiedUser;
    }
}

module.exports = UseRewardsUseCase;
