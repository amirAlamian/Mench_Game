// eslint-disable-next-line no-unused-vars
module.exports = function minorErrorHandler (err, req, res, next) {
    // error handling logic
    res.status(400).send('Something broke!');
};
