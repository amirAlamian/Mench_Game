const { chatId, message } = require('../chatsProperties');

class SendChatRequest {
    constructor ({ Validator, LocaleService, props }) {
        this.Validator = Validator;
        this.props = props;
        this.LocaleService = LocaleService;
        this.schema = {
            type: 'object',
            additionalProperties: false,
            required: [ 'chatId', 'message' ],
            properties: {
                chatId,
                message,
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

module.exports = SendChatRequest;
