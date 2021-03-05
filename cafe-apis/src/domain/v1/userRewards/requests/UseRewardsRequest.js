const { rewardId } = require('../userRewardsProperties');

class GetUserRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'rewardId' ],
            properties: {
                rewardId,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('userReward', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = GetUserRequest;
