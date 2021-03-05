const BaseUseCase = require('src/application/v1/BaseUseCase');

class GetTargetMatchRequestUseCase extends BaseUseCase {
    constructor ({
        GetTargetMatchRequestRequest,
        props,
        MatchRequestRepository,
    }) {
        super();
        this.MatchRequestRepository = MatchRequestRepository;
        this.request = GetTargetMatchRequestRequest;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const matchRequest = await this.MatchRequestRepository.findMatchRequestById(this.props.matchId);

        if (!matchRequest) {
            throw {
                message: 'Match Request Data Not Found',
                code: 'NOT_FOUND',
            };
        }

        return matchRequest;
    }
}

module.exports = GetTargetMatchRequestUseCase;
