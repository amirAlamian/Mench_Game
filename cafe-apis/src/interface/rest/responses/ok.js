// https://github.com/omniti-labs/jsend
module.exports = (message, data) => ({
    successful: true,
    statusCode: 200,
    message,
    ...data,
});
