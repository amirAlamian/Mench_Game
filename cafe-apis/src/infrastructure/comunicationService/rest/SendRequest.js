// send request to user service with token
const rp = require('request-promise');

class SendRequest {
    constructor ({ locale }) {
        this.locale = locale;
    }
    async request ({ uri, method, formData, body, headers, qs = {}, json }) {
        headers = { ...headers };
        headers['accept-language'] = this.locale;

        const options = {
            headers,
            uri,
            method,
            body,
            qs,
            json,
            formData,
        };
        // send request to service
        return await rp(options).catch(err => {
            throw err.message;
        });
    }
}

module.exports = SendRequest;
