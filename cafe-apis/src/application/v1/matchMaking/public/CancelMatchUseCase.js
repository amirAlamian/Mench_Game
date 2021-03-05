const BaseUseCase = require('src/application/v1/BaseUseCase');

class CancelMatchUseCase extends BaseUseCase {
    constructor ({
        CancelMathRequest,
        props,
        currentUser,
        MatchMakingRepository,
        UserRepository,
    }) {
        super();
        this.request = CancelMathRequest;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.MatchMakingRepository = MatchMakingRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        const match = await this.MatchMakingRepository.findMatchById(this.props.matchId);

        if (!match) {
            throw { message: 'Match Not Found', code: 'NOT_FOUND' };
        }

        if (match.players.length === 1) {
            await this.MatchMakingRepository.removeMatch(this.props.matchId);
        } else {
            const index = match.players.indexOf(user.username);
            match.players.splice(index, 1);
            await this.MatchMakingRepository.updateMatchById(this.props.matchId, {
                players: match.players,
            });
        }
    }
}

module.exports = CancelMatchUseCase;
