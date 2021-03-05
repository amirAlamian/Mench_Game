
class GetUSerWeeklyLeaderBoardUseCase {
    constructor ({
        UserRepository,
        currentUser,
    }) {
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        const { count: weeklyLeaderBoard } = await this.UserRepository.userWeeklyLeaderBoard(user.weeklyScoreChange);
        return weeklyLeaderBoard;
    }
}

module.exports = GetUSerWeeklyLeaderBoardUseCase;
