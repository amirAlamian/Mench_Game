
class ChangeGuestToNormalUseCase {
    constructor ({
        UserRepository,
        currentUser,
    }) {
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
        this.currentUser = currentUser;
    }
    execute = async () => {
        const user = await this.UserRepository.findUser(this.currentUser);

        if (user) {
            return user._id;
        }
    }
}

module.exports = ChangeGuestToNormalUseCase;
