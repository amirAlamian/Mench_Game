const BaseUseCase = require('src/application/v1/BaseUseCase');

class GetUserUseCase extends BaseUseCase {
    constructor ({ GetUserRequest, props, UserRepository }) {
        super();
        this.request = GetUserRequest;
        this.UserRepository = UserRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser(this.props);

        if (!user) {
            throw {
                code: 'NOT_FOUND',
                message: 'User Not Found',
            };
        }

        return user;
    }
}

module.exports = GetUserUseCase;
