const BaseUseCase = require('src/application/v1/BaseUseCase');

class AcceptMatchRequestUseCase extends BaseUseCase {
    constructor ({
        AcceptMatchRequestRequest,
        props,
        MatchRequestRepository,
        currentUser,
        MatchMakingRepository,
        UserRepository,
        Redis,
    }) {
        super();
        this.MatchRequestRepository = MatchRequestRepository;
        this.request = AcceptMatchRequestRequest;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.MatchMakingRepository = MatchMakingRepository;
        this.Redis = Redis;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        const matchRequest = await this.MatchRequestRepository.findMatchRequestById(
            this.props.matchId,
        );

        if (!matchRequest || matchRequest.status !== 'Pending') {
            throw {
                message: 'Match Request Not Found',
                code: 'NOT_FOUND',
            };
        }

        const match = {
            players: [],
        };
        match.players.push(user.username);
        match.players.push(matchRequest.reqFrom);
        match.isGameStarted = true;
        match.gameMode = 'FriendlyGame';
        match.maxPlayerCount = 2;
        const createdMatch = await this.MatchMakingRepository.createMatch(match);
        const {
            players,
            gameMode,
        } = createdMatch;

        this.Redis.setRedisData(createdMatch._id.toString(), JSON.stringify({
            players,
            gameMode,
        }), 600);

        const modifiedMatchRequest = await this.MatchRequestRepository.editMatchRequestById(matchRequest._id, {
            matchId: createdMatch._id.toString(),
            status: 'Accepted',
        });
        return modifiedMatchRequest;
    }
}

module.exports = AcceptMatchRequestUseCase;
