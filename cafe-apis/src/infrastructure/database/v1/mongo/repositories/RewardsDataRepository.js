const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class RewardsDataRepository extends AbstractEntityRepository {
    constructor ({ rewardsDataModel }) {
        super(rewardsDataModel, 'userRewards');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
        };
        this.translateFields = [ ];
    }

    findReward = async (criteria = {}) => {
        return await this.findOne({ criteria });
    }
}

module.exports = RewardsDataRepository;
