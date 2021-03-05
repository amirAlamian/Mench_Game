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
        return await this.UserRepository.searchUser(this.props, { username: 'like' });
    }
}

module.exports = GetUserUseCase;
