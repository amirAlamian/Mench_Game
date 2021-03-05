const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/repositories/AbstractEntityRepository');
const crypto = require('crypto');

class UserRepository extends AbstractEntityRepository {
    constructor ({ userModel, LocaleService }) {
        super(userModel, 'users', LocaleService);
        this.outputs = {
            REPO_DUPLICATE_ERROR: 'DUPLICATE_ERROR',
            VALIDATION_ERROR: 'VALIDATION_ERROR',
        };
        this.userModel = userModel;
        this.filterTypes = {
            deviceId: 'equal',
            phoneNumber: 'equal',
            name: 'equal',
            _id: 'equal',
            email: 'equal',
            username: 'in',
            inviteCode: 'equal',
            score: 'equal',
        };
        this.translateFields = [ ];
        this.possibleDuplicates = [ 'username', 'email' ];
    }


    createGuestUser = async (userData) => {
        await this.#completedUserInformation(userData);
        return await this.create(userData);
    }
    RegisterUser = async (userData) => {
        this.#completedUserInformation(userData);
        this.#hashPassword(userData);
        return await this.create(userData);
    }
    checkUserExistence = async (deviceId) => {
        const criteria = {
            deviceId,
        };
        return await this.checkExistence({ criteria });
    }
    editUser = async ({ deviceId, ...modifications }) => {
        const criteria = {
            deviceId,

        };

        await this.update({ criteria }, modifications);

        return await this.findOne({ criteria });
    }
    updateUserById = async (_id, modifications) => {
        return await this.updateById(_id, modifications);
    }
    findUser = async (criteria) => {
        return await this.findOne({ criteria });
    }
    searchUser = async (criteria, customFilterTypes) => {
        return await this.findAndCountAll({ criteria }, customFilterTypes);
    }
    findTop10 =async () => {
        return this.findAndCountAll({
            orderBy: 'score',
            orderType: 'desc',
            limit: 10,
            fields: [ '_id', 'name', 'username', 'score' ],
        });
    }
    userLeaderBoard = async (score) => {
        const criteria = {
            score: { $gt: score },
        };
        return await this.findAndCountAll({ criteria });
    }
    friendsLeaderBoard = async (username) => {
        const criteria = { username };
        return await this.findAndCountAll({
            criteria,
            orderBy: 'score',
            orderType: 'desc',
            fields: [ '_id', 'name', 'username', 'score' ],
        });
    }
    weeklyLeaderBoard = async () => {
        return await this.findAndCountAll({
            orderBy: 'weeklyScoreChange',
            orderType: 'desc',
            fields: [ '_id', 'name', 'username', 'weeklyScoreChange' ],
        });
    }
    userWeeklyLeaderBoard = async (weeklyScoreChange) => {
        const criteria = {
            weeklyScoreChange: { $gt: weeklyScoreChange },
        };
        return await this.findAndCountAll({ criteria });
    }
    #completedUserInformation = (user) => {
        user.username = user.username ? user.username : crypto.randomBytes(4).toString('hex');
        user.inviteCode = crypto.randomBytes(4).toString('hex');
    }
    #hashPassword = (user) => {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.hash = crypto.pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512').toString('hex');
    }
}

module.exports = UserRepository;
