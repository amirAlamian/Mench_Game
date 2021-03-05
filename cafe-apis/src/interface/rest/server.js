
const express = require('express');
const viewRouter = require('../../../router');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const partial = require('express-partial');
const passportInitializer = require('src/infrastructure/auth/passport-config');

class Server {
    constructor ({ config, logger, router }) {
        this.http = null;
        this.web = config.web;
        this.logger = logger;
        this.express = express();
        this.version = config.version;
        this.express.use(flash());
        this.express.use(partial());
        passportInitializer(passport);

        // PASSPORT
        this.express.use(flash());
        this.express.use(session({
            secret: process.env.ADMIN_SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.disable('x-powered-by');
        this.express.set('view engine', 'ejs');
        this.express.use(express.static('public'));
        this.express.use('/api', router);
        this.express.use('/', viewRouter);
        process.on('SIGTERM', this.shutDown);
        process.on('SIGINT', this.shutDown);
    }

    shutDown () {
        this.http.close(() => process.exit(0)); // shutdown server safely
        process.exit(1);
        setTimeout(() => process.exit(1), 10000); // force server to shutdown after 5 seconds
    }

    async start () {
        process.on(
            'unhandledRejection',
            function (reason, promise) {
            // :FIXME
                this.logger.error(reason);
                this.logger.error(promise);
                process.exit(1);
            }.bind(this),
        );
        return await new Promise((resolve) => {
            this.http = this.express.listen(
                this.web.port,
                () => {
                    const { port } = this.http.address();
                    this.logger.info(
                        `[p ${process.pid}] Listening at port ${port}`,
                    );
                    resolve(this.http);
                },
            );
        });
    }


    close () {
        this.shutDown();
    }
}

module.exports = Server;
