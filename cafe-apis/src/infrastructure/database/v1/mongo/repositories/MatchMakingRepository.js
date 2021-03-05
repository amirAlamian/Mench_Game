const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class MatchMakingRepository extends AbstractEntityRepository {
    constructor ({ matchMakingModel }) {
        super(matchMakingModel, 'matchMaking');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
            _id: 'equal',
            players: 'elemMatch',
            maxPlayerCount: 'equal',
            gameMode: 'equal',
            isGameStarted: 'equal',
        };
        this.translateFields = [ ];
    }

    createMatch = async (matchData) => {
        return await this.create(matchData);
    }
    findMatch = async (maxPlayers, gameMode, isGameStarted) => {
        const criteria = {
            maxPlayers,
            gameMode,
            isGameStarted,
        };
        return await this.findAndCountAll({ criteria });
    }
    updateMatchById = async (_id, modifications) => {
        return await this.updateById(_id, modifications);
    }
    findMatchById = async (_id) => {
        return await this.findById(_id);
    }
    removeMatchById = async (_id) => {
        return await this.destroyById(_id);
    }
}

module.exports = MatchMakingRepository;
