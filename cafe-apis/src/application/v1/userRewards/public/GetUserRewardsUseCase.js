class SetRefreshTokenUseCase {
    constructor ({ UserRewardRepository, currentUser }) {
        this.currentUser = currentUser;
        this.UserRewardRepository = UserRewardRepository;
    }
    execute = async () => {
        return await this.UserRewardRepository.findUserRewards(this.currentUser);
    }
}

module.exports = SetRefreshTokenUseCase;
