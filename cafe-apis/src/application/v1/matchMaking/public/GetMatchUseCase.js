const BaseUseCase = require('src/application/v1/BaseUseCase');

class GetMatchUseCase extends BaseUseCase {
    constructor ({
        GetMatchRequest,
        props,
        MatchMakingRepository,
    }) {
        super();
        this.request = GetMatchRequest;
        this.MatchMakingRepository = MatchMakingRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const match = await this.MatchMakingRepository.findMatchById(this.props.matchId);

        if (!match) {
            throw { message: 'Match Not Found', code: 'NOT_FOUND' };
        }

        return match;
    }
}

module.exports = GetMatchUseCase;
