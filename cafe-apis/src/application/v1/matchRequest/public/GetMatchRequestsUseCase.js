class GetMatchRequestsUseCase {
    constructor ({
        UserRepository,
        currentUser,
        MatchRequestRepository,
    }) {
        this.currentUser = currentUser;
        this.UserRepository = UserRepository;
        this.MatchRequestRepository = MatchRequestRepository;
    }
    execute = async () => {
        const user = await this.UserRepository.findUser(this.currentUser);

        const { rows } = await this.MatchRequestRepository.findAllMatchRequests(user.username);
        return rows;
    }
}

module.exports = GetMatchRequestsUseCase;
