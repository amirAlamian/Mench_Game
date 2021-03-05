const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class MatchRequestRepository extends AbstractEntityRepository {
    constructor ({ matchRequestModel }) {
        super(matchRequestModel, 'matchRequest');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
            _id: 'equal',
            reqFrom: 'equal',
            reqTp: 'equal',
            status: 'equal',
        };
        this.translateFields = [ ];
    }


    createMatchRequest = async (matchRequestData) => {
        return await this.create(matchRequestData);
    }
    findAllMatchRequests = async (username) => {
        const criteria = {
            reqTo: username,
            reqFrom: username,
        };
        return await this.findAndCountAll({ criteria }, undefined, { $or: [ 'reqTo', 'reqFrom' ] });
    }
    findMatchRequestById = async (_id) => {
        return await this.findById(_id);
    }
    editMatchRequestById = async (_id, modifications) => {
        return await this.updateById(_id, modifications);
    }
}

module.exports = MatchRequestRepository;
