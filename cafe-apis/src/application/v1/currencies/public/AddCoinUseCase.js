const BaseUseCase = require('src/application/v1/BaseUseCase');

class AddCoinUseCase extends BaseUseCase {
    constructor ({
        AddCoinRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = AddCoinRequest;
        this.UserRepository = UserRepository;
        this.props = props;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        user.coin += +this.props.coin;
        const { _id, coin } = user;

        return await this.UserRepository.updateUserById(_id, {
            coin,
        });
    }
}

module.exports = AddCoinUseCase;
