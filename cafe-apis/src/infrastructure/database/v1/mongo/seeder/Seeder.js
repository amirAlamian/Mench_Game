const CreateFieldTypeSeeder = require('./CreateFieldTypeSeeder');
const container = require('src/container');

const MongoDb = container.resolve('MongoDb');
MongoDb.connect().then(() => {
    switch (process.argv[2]) { // run with cmd and -- flags
        case 'createField': {
            new CreateFieldTypeSeeder(
                container.cradle,
            ).execute()
                .then(() => {
                    process.exit(0);
                });
            break;
        }

        default: {
            break;
        }
    }
});
