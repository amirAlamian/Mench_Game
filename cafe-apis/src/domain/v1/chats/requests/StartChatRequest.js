const { username } = require('../chatsProperties');

class StartChatRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'username' ],
            properties: {
                username,
            },

        };
    }

    async validate () {
        return await this.Validator.validate('chats', this.props, this.schema);
    }

    async authorize () {
        return true;
    }
}

module.exports = StartChatRequest;
