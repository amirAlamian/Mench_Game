const BaseUseCase = require('src/application/v1/BaseUseCase');

class SetNewActionUseCase extends BaseUseCase {
    constructor ({
        SetNewActionRequest,
        props,
        Redis,
    }) {
        super();
        this.request = SetNewActionRequest;
        this.props = props;
        this.Redis = Redis;
    }
    execute = async () => {
        await super.execute();
        const match = await this.Redis.getRedisData(this.props.matchId);

        if (!match) {
            throw { message: 'Match Not Found', code: '"NOT_FOUND' };
        }

        const buf = Buffer.from(this.props.newAction, 'base64');

        if (!match.actions) {
            match.actions = [];
        }

        match.actions.push(JSON.parse(buf.toString()));
        await this.Redis.setRedisData(this.props.matchId.toString(), JSON.stringify(match), 600);

        return match;
    }
}

module.exports = SetNewActionUseCase;
