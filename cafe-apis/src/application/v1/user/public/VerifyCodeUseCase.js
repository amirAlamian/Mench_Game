const BaseUseCase = require('src/application/v1/BaseUseCase');

class VerifyCodeUseCase extends BaseUseCase {
    constructor ({
        VerifyCodeRequest,
        props,
        UserRepository,
        UserRewardRepository,
        RewardsDataRepository,
    }) {
        super();
        this.request = VerifyCodeRequest;
        this.UserRewardRepository = UserRewardRepository;
        this.RewardsDataRepository = RewardsDataRepository;
        this.UserRepository = UserRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        Reflect.deleteProperty(this.props, 'verificationCode');
        const {
            inviteCode,
            ...rest
        } = this.props;
        let user;

        if (rest.deviceId) {
            user = await this.UserRepository.findUser({ deviceId: rest.deviceId });
        } else {
            user = await this.UserRepository.findUser(rest);
        }

        if (!user) {
            user = await this.UserRepository.createGuestUser(rest);
        } else {
            user = await this.UserRepository.editUser(rest);
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
    }
}

module.exports = VerifyCodeUseCase;
