const BaseUseCase = require('src/application/v1/BaseUseCase');

class RegisterUserUseCase extends BaseUseCase {
    constructor ({ RegisterUserRequest, props, UserRepository, AuthRepository }) {
        super();
        this.request = RegisterUserRequest;
        this.UserRepository = UserRepository;
        this.AuthRepository = AuthRepository;
        this.props = props;
    }
    execute = async () => {
        await super.execute();

        const user = await this.UserRepository.RegisterUser(this.props);
        const authTokens = await this.AuthRepository.createAuthUser(user);
        return {
            user,
            authTokens,
        };
    }
}

module.exports = RegisterUserUseCase;
