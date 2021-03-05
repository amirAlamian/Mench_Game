const { username } = require('../friendshipProperties');

class SendFriendRequestRequest {
    constructor ({ Validator, UserRepository, props, currentUser }) {
        this.Validator = Validator;
        this.props = props;
        this.currentUser = currentUser;
        this.UserRepository = UserRepository;
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
        return await this.Validator.validate('friendship', this.props, this.schema);
    }

    async authorize () {
        const user = await this.UserRepository.findUser({ _id: this.currentUser });


        if (user.username === this.props.username) {
            return { message: 'REALLY ??? YOU SENDING ME YOUR OWN USERNAME ????', code: 'VALIDATION_ERROR' };
        }

        if (user.friendsUsername.includes(this.props.username)) {
            return { message: 'You Already Friend With This User', code: 'VALIDATION_ERROR' };
        }

        if (user.pendingFriends.includes(this.props.username)) {
            return { message: 'This Request is in Pending Mode Already', code: 'VALIDATION_ERROR' };
        }

        if (user.requestFriends.includes(this.props.username)) {
            return { message: 'You Already Sent Request To This User', code: 'VALIDATION_ERROR' };
        }

        this.props.user = user;
        return true;
    }
}

module.exports = SendFriendRequestRequest;
