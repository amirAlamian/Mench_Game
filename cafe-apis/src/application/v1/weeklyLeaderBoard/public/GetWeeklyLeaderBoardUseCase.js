
class GetMatchUseCase {
    constructor ({
        UserRepository,
    }) {
        this.UserRepository = UserRepository;
    }
    execute = async () => {
        return await this.UserRepository.weeklyLeaderBoard();
    }
}

module.exports = GetMatchUseCase;
