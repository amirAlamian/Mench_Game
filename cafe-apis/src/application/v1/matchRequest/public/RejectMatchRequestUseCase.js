const BaseUseCase = require('src/application/v1/BaseUseCase');

class RejectMatchRequestUseCase extends BaseUseCase {
    constructor ({
        RejectMatchRequestRequest,
        props,
        MatchRequestRepository,
    }) {
        super();
        this.MatchRequestRepository = MatchRequestRepository;
        this.request = RejectMatchRequestRequest;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const matchRequest = await this.MatchRequestRepository.findMatchRequestById(
            this.props.matchId,
        );

        if (!matchRequest || matchRequest.status !== 'Pending') {
            throw {
                message: 'Match Request Not Found',
                code: 'NOT_FOUND',
            };
        }


        const modifiedMatchRequest = await this.MatchRequestRepository.editMatchRequestById(matchRequest._id, {
            status: 'Rejected',
        });
        return modifiedMatchRequest;
    }
}

module.exports = RejectMatchRequestUseCase;
