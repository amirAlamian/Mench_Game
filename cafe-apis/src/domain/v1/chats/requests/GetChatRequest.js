const { chatId } = require('../chatsProperties');

class GetChatRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'chatId' ],
            properties: {
                chatId,
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

module.exports = GetChatRequest;
