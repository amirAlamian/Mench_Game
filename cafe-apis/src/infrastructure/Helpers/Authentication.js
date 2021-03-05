const jwt = require('jsonwebtoken');

class Authentication {
    // Generate Access and Refresh Tokens
    generateRefreshTokens = function (payload) {
        const tokens = {
            accessToken: jwt.sign({
                payload,
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            },
            ),
            refreshToken: jwt.sign({
                payload,
            }, process.env.REFRESH_TOKEN_SECRET),
        };
        return tokens;
    };

    // Generate Access and Refresh Tokens
    genAccTokens = function (payload) {
        return jwt.sign({
            payload,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });
    };


    // Middleware for Validating Access Tokens
    validateAccess = async function (req, res, next, currentUser, UserRepository) {
        if (!req.headers.authorization) {
            return next({
                message: 'Authorization Failed',
                status: 401,
            });
        }


        // Getting Auth Token From Header
        const auth = req.headers.authorization.split(' ');

        if (!auth) {
            return next({
                message: 'Authorization Failed',
                status: 401,
            });
        }


        // Token Validation
        if (auth.length === 2 && (auth[0] === 'Bearer' || auth[0] === 'Token')) {
            jwt.verify(auth[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err || !user) {
                    return next({ message: 'Unauthorized User', status: 403 });
                }

                const authUser = UserRepository.findUser({ _id: user.payload });

                if (!authUser) {
                    throw {
                        code: 'FORBIDDEN',
                        message: 'user not found',
                    };
                }

                currentUser.payload = user.payload;
            });
        } else {
            return next({
                message: 'Authorization Failed',
                status: 401,
            });
        }
    };


    // Middleware for Validating Access Tokens
    validateRefreshToken = async function (req, res, next, currentUser) {
        if (!req.body.refreshToken) {
            return next({
                message: 'Authorization Failed',
                status: 401,
            });
        }

        jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err || !user) {
                return next({ message: 'Unauthorized User', status: 403 });
            }

            currentUser.payload = user.payload;
        });
    };
}

module.exports = Authentication;
