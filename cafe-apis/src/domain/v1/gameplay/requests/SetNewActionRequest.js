const { matchId, newAction } = require('../gameplayProperties');

class SetNewActionRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'matchId', 'newAction' ],
            properties: {
                matchId,
                newAction,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('gameplay', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = SetNewActionRequest;
