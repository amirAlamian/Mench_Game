const BaseUseCase = require('src/application/v1/BaseUseCase');

class MakeNormalMatchUseCase extends BaseUseCase {
    constructor ({
        MakeNormalMatchRequest,
        props,
        MatchRequestRepository,
        currentUser,
        MatchMakingRepository,
        UserRepository,
        Redis,
    }) {
        super();
        this.MatchRequestRepository = MatchRequestRepository;
        this.request = MakeNormalMatchRequest;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.MatchMakingRepository = MatchMakingRepository;
        this.Redis = Redis;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        const { rows: matches } = await this.MatchMakingRepository.findMatch(
            this.props.maxPlayers,
            this.props.gameMode, false,
        );

        let match;

        if (matches && matches.length) {
            match = matches[0];

            if (!match.players.includes(user.username)) {
                match.players.push(user.username);

                if (match.players.length === this.props.maxPlayers) {
                    match.isGameStarted = true;
                    const {
                        players,
                        gameMode,
                    } = match;
                    this.Redis.setRedisData(match._id.toString(), JSON.stringify({ players, gameMode }), 600);
                }

                await this.MatchMakingRepository.updateMatchById(match._id, {
                    players: match.players,
                    isGameStarted: match.isGameStarted,

                });
            }
        } else {
            match = {
                players: [],
            };
            match.players.push(user.username);
            match.gameMode = this.props.gameMode;
            match.maxPlayerCount = this.props.maxPlayers;
            match.isGameStarted = false;
            await this.MatchMakingRepository.createMatch(match);
        }

        return match;
    }
}

module.exports = MakeNormalMatchUseCase;
