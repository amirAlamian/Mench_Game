const BaseUseCase = require('src/application/v1/BaseUseCase');

class GetGameDataUseCase extends BaseUseCase {
    constructor ({
        GetGameDataRequest,
        props,
        Redis,
    }) {
        super();
        this.request = GetGameDataRequest;
        this.props = props;
        this.Redis = Redis;
    }
    execute = async () => {
        await super.execute();
        const match = await this.Redis.getRedisData(this.props.matchId);

        if (!match) {
            throw { message: 'Match Not Found', code: '"NOT_FOUND' };
        }

        return match;
    }
}

module.exports = GetGameDataUseCase;
