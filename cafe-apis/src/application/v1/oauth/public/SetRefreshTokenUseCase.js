const BaseUseCase = require('src/application/v1/BaseUseCase');

class SetRefreshTokenUseCase extends BaseUseCase {
    constructor ({ props, AuthRepository, Authentication, currentUser }) {
        super();
        this.AuthRepository = AuthRepository;
        this.Authentication = Authentication;
        this.currentUser = currentUser;
        this.props = props;
    }
    execute = async () => {
        await super.execute();
        const authUser = await this.AuthRepository.findAuthData(this.props);

        if (!authUser) {
            throw {
                code: 'NOT_FOUND',
                message: 'User Not Found',
            };
        }

        if (authUser.playCount) {
            authUser.playCount += 1;
        } else {
            authUser.playCount = 1;
        }

        await this.AuthRepository.updateAuthData(authUser._id, { playCount: authUser.playCount });
        const tokens = {
            accessToken: this.Authentication.genAccTokens(this.currentUser),
            refreshToken: this.props.refreshToken,
        };

        return tokens;
    }
}

module.exports = SetRefreshTokenUseCase;
