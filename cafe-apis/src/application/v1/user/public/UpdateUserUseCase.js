const BaseUseCase = require('src/application/v1/BaseUseCase');

class UpdateUserUseCase extends BaseUseCase {
    constructor ({ UpdateUserRequest, props, UserRepository, currentUser }) {
        super();
        this.request = UpdateUserRequest;
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        return await this.UserRepository.updateUserById(this.currentUser, this.props);
    }
}

module.exports = UpdateUserUseCase;
