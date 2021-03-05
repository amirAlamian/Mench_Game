const cron = require('cron').CronJob;

class WeeklyScoreCalculator {
    constructor ({ UserRepository }) {
        this.UserRepository = UserRepository;
    }
    init = () => {
        const task = new cron(
            '0 0 * * 6', // this means every Saturday at 00:00 AM reset the leader board
            function () {
                const data = this.createNewWeeklyLeaderBoard();
            },
            null,
            true,
            'Asia/Tehran',
        );
        return task;
    }
         createNewWeeklyLeaderBoard = async () => {
             const { rows: users } = await this.UserRepository.searchUser({});


             if (users.length === 0) {
                 return { status: false, message: 'there is no information to work with. create some users' };
             }


             for (let i = 0, n = users.length; i < n; i++) {
                 if (users[i].score === users[i].lastWeekScore) continue;
                 this.UserRepository.updateUserById(users[i]._id, {
                     lastWeekScore: users[i].lastWeekScore,
                     weeklyScoreChange: 0,
                 });
             }

             return { status: true, message: 'weekly leaderBoard has been updated!' };
         }
}

module.exports = WeeklyScoreCalculator;
