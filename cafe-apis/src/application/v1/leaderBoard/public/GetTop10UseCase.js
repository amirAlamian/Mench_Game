
class GetTop10UseCase {
    constructor ({
        UserRepository,
    }) {
        this.UserRepository = UserRepository;
    }
    execute = async () => {
        return await this.UserRepository.findTop10();
    }
}

module.exports = GetTop10UseCase;
