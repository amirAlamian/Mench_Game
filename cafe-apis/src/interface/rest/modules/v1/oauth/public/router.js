const {
    Router,
} = require('express');
const {
    scopeCreator,
} = require('src/interface/rest/middlewares');
const {
    post,
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
     *               refreshToken:
     *                   type: string
     *           required:
     *              deviceId
     */

    const router = Router();

    /**
     * @swagger
     *
     *   /oauth/refreshToken:
     *      post:
     *         tags: ['oauth']
     *         order: 1
     *         security:
     *           - bearerAuth: []
     *         requestBody:
     *             content:
     *                 application/json:
     *                     schema:
     *                        properties:
     *                            refreshToken:
     *                                type: string
     *                     examples:
     *                         example1:
     *                             value:
     *                                 refreshToken: "test*****************"
     *         responses:
     *           200:
     *             description: Item is ready.
     *           400:
     *             description: Request failed.
     *           404:
     *             description: Resource not found.
     *
     */
    router.post('/refreshToken', scopeCreator(container, false), post);
    return router;
};
