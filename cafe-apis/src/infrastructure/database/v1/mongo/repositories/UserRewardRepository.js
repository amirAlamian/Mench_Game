const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class UserRewardRepository extends AbstractEntityRepository {
    constructor ({ userRewardModel }) {
        super(userRewardModel, 'rewards');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
        };
        this.translateFields = [ ];
    }
    createReward = async (userRewardsData) => {
        return await this.create(userRewardsData);
    }
    findUserRewards = async (userId) => {
        const criteria = {
            userId,
        };
        return await this.findAndCountAll({ criteria });
    }
    findUserRewardsById = async (_id) => {
        return this.findById(_id);
    }
    deleteUserRewardById = async (_id) => {
        return await this.destroyById(_id);
    }
}

module.exports = UserRewardRepository;
