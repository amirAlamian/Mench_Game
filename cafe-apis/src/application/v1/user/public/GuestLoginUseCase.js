const BaseUseCase = require('src/application/v1/BaseUseCase');

class GuestLoginUseCase extends BaseUseCase {
    constructor ({
        GuestLoginRequest,
        props,
        UserRepository,
        AuthRepository,
        RewardsDataRepository,
        UserRewardRepository,
    }) {
        super();
        this.request = GuestLoginRequest;
        this.UserRepository = UserRepository;
        this.RewardsDataRepository = RewardsDataRepository;
        this.AuthRepository = AuthRepository;
        this.UserRewardRepository = UserRewardRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const existedUser = await this.UserRepository.checkUserExistence(this.props.deviceId);
        let user;
        const {
            inviteCode,
            ...rest
        } = this.props;

        if (!existedUser) {
            user = await this.UserRepository.createGuestUser(rest);
        } else if (this.props.name) {
            user = await this.UserRepository.editUser(rest);
        } else {
            user = await this.UserRepository.findUser(rest);
        }

        if (inviteCode) {
            const InviterUser = await this.UserRepository.findUser({
                inviteCode,
            });

            if (InviterUser) {
                const reward = {
                    userId: InviterUser._id,
                    rewardType: 'InviteCode',
                    rewardMessage: 'Reward for Inviting User',
                };
                const rewardData = await this.RewardsDataRepository.findReward();

                if (rewardData) {
                    reward.rewardCount = rewardData.inviteReward;
                }

                await this.UserRewardRepository.createReward(reward);
            }
        }

        const authTokens = await this.AuthRepository.createAuthUser(user);
        return {
            user,
            authTokens,
        };
    }
}

module.exports = GuestLoginUseCase;
