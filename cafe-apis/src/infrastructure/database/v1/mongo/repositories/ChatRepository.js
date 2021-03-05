const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');

class ChatRepository extends AbstractEntityRepository {
    constructor ({ chatModel }) {
        super(chatModel, 'auth');
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
        };
        this.filterTypes = {
            _id: 'equal',
            id: 'equal',
            userA: 'equal',
            userB: 'equal',
        };
        this.translateFields = [ ];
    }
    createChat = async (chatData) => {
        return await this.create(chatData);
    }
    findChatByUsernames = async (firstUsername, secondUsername) => {
        const criteria = {
            userA: firstUsername,
            userB: secondUsername,
        };
        let result = await this.findOne({ criteria }, { $or: [ 'userA', 'userB' ] });

        if (!result) {
            criteria.UserB = firstUsername;
            criteria.UserA = secondUsername;
            result = await this.findOne({ criteria }, { $or: [ 'userA', 'userB' ] });
        }

        return result;
    }
    findChatById = async (_id) => {
        return await this.findById(_id);
    }
    updateChatById = async (_id, modifications) => {
        // await this.updateById(_id, modifications);
        return await this.findById(_id);
    }
}

module.exports = ChatRepository;
