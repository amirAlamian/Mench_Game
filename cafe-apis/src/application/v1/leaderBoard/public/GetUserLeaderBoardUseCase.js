
class GetUserLeaderBoardUseCase {
    constructor ({
        UserRepository,
        currentUser,
    }) {
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        const user = await this.UserRepository.findUser({ _id: this.currentUser });

        return await this.UserRepository.userLeaderBoard(user.score);
    }
}

module.exports = GetUserLeaderBoardUseCase;
