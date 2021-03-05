const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class AuthRepository extends AbstractEntityRepository {
    constructor ({ authModel, Authentication }) {
        super(authModel, 'auth');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.Authentication = Authentication;

        this.filterTypes = {
            refreshToken: 'equal',
        };
        this.translateFields = [ ];
    }
    createAuthUser = async (user) => {
        const auth = await this.Authentication.generateRefreshTokens(user._id);
        const authUserTokens = {
            playCount: 1,
            refreshToken: auth.refreshToken,
        };
        await this.create(authUserTokens);
        return auth;
    }
    findAuthData = async (criteria) => {
        return await this.findOne({ criteria });
    }
    updateAuthData = async (_id, modifications) => {
        return await this.updateById(_id, modifications);
    }
}

module.exports = AuthRepository;
