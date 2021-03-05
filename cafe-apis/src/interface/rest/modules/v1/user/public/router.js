const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    post,
    Verification,
    VerifyCode,
    register,
    guestToNormal,
    updateUser,
    get,
    search,
} = require('./controllers');

module.exports = (container) => {
    /**
     * @swagger
     * components:
     *   securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     *         bearerFormat: JWT
     *   schemas:
     *       position:
     *           type: object
     *           properties:
     *               deviceId:
     *                   type: string
     *               phoneNumber:
     *                   type: string
     *           required:
     *              deviceId
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /user/guestLogin:
     *      post:
     *         tags: ['User']
     *         description: guest user login
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            deviceId:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 deviceId: "example1332dfs"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */

    router.post('/guestLogin', scopeCreator(container, false), post);


    /**
     * @swagger
     *
     *   /user/sendVerificationCode:
     *      post:
     *         tags: ['User']
     *         description: send verification code
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            phoneNumber:
     *                                type: string
     *                            deviceId:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 deviceId: "example1332dfs"
     *                                 phoneNumber: "09214698677"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */

    router.post('/sendVerificationCode', scopeCreator(container, false), Verification);

    /**
     * @swagger
     *
     *   /user/verifyRegisterCode:
     *      post:
     *         tags: ['User']
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            phoneNumber:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 phoneNumber: "09214698677"
     *                                 deviceId: "example1332dfs"
     *                                 inviteCode: "67a840b2"
     *                                 name: "person"
     *                                 verificationCode: "ex"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */


    router.post('/verifyRegisterCode', scopeCreator(container, false), VerifyCode);

    /**
     * @swagger
     *
     *   /user/register:
     *      post:
     *         tags: ['User']
     *         order: 1
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            phoneNumber:
     *                                type: string
     *                            username:
     *                                type: string
     *                            name: 
     *                                type: string
     *                            email:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 phoneNumber: "09214698677"
     *                                 username: "someRandomPerson"
     *                                 name: "person"
     *                                 email: "test@gmail.com"
     *                                 password : "1234asdfA"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/register', scopeCreator(container, false), register);

    /**
     * @swagger
     *
     *   /user/guestToNormal:
     *      put:
     *         tags: ['User']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.put('/guestToNormal', scopeCreator(container), guestToNormal);

    /**
     * @swagger
     *
     *   /user/updateUserProfile:
     *      post:
     *         tags: ['User']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            username:
     *                                type: string
     *                            name: 
     *                                type: string
     *                            email:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 username: "someRandomPerson"
     *                                 name: "person"
     *                                 email: "test@gmail.com"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */


    router.post('/updateUserProfile', scopeCreator(container), updateUser);
    /**
     * @swagger
     *
     *   /user/getProfile:
     *      post:
     *         tags: ['User']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            username:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 username: "someRandomPerson"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/getProfile', scopeCreator(container), get);


    /**
     * @swagger
     *
     *   /user/searchUser:
     *      post:
     *         tags: ['User']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            username:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 username: "someRandomPerson"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */

    router.post('/searchUser', scopeCreator(container), search);
    return router;
};
