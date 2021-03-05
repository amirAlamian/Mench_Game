
class GetFriendsLeaderBoardUseCase {
    constructor ({
        UserRepository,
        currentUser,
    }) {
        this.UserRepository = UserRepository;
        this.currentUser = currentUser;
    }
    execute = async () => {
        const user = await this.UserRepository.findUser({ _id: this.currentUser });


        const usernames = [ user.username ];

        for (let index = 0; index < user.friendsUsername.length; index++) {
            usernames.push(user.friendsUsername[index]);
        }

        return await this.UserRepository.friendsLeaderBoard(usernames);
    }
}

module.exports = GetFriendsLeaderBoardUseCase;
