module.exports = (error, message, statusCode) => ({
    successful: 'false',
    statusCode,
    errors: error,
    message,
});
