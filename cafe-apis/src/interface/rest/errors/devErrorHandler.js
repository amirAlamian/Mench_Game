const statusCodes = require('src/interface/rest/constants/statusCodes');
const fail = require('src/interface/rest/responses/fail');


// eslint-disable-next-line no-unused-vars
module.exports = ({ logger, LocaleService }) => (err, req, res, next) => {
    logger.error(err);

    let errors;
    let message;
    let statusCode;
    let status;

    switch (err.code) {
        case 'NOT_FOUND':
            message = err.message ? err.message : LocaleService.translate(
                'generic.error.notFound',
                { resource: err.resource },
            );
            status = 404;
            statusCode = statusCodes.NOT_FOUND;
            break;
        case 'VALIDATION_ERROR':
            errors = err.errors;
            message = err.message ? err.message : LocaleService.translate('generic.error.failed');
            statusCode = statusCodes.BAD_REQUEST;
            status = 400;
            break;
        case 'FORBIDDEN':
            message = err.message ?
                err.message :
                LocaleService.translate('generic.error.forbidden');
            statusCode = statusCodes.FORBIDDEN;
            status = 403;
            break;
        default:
            errors = err.stack;
            message = err.message ? err.message : LocaleService.translate('generic.error.internalServer');
            status = 500;
            statusCode = statusCodes.INTERNAL_SERVER_ERROR;
            break;
    }

    res.status(statusCode).json(fail(errors, message, status));
};
