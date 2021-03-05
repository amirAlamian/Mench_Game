const BaseUseCase = require('src/application/v1/BaseUseCase');

class AddGemUseCase extends BaseUseCase {
    constructor ({
        AddGemRequest,
        UserRepository,
        props,
        currentUser,
    }) {
        super();
        this.request = AddGemRequest;
        this.UserRepository = UserRepository;
        this.props = props;
        this.currentUser = currentUser;
    }
    execute = async () => {
        await super.execute();
        const user = await this.UserRepository.findUser({ _id: this.currentUser });
        user.gem += +this.props.gem;
        const { _id, gem } = user;

        return await this.UserRepository.updateUserById(_id, {
            gem,
        });
    }
}

module.exports = AddGemUseCase;
