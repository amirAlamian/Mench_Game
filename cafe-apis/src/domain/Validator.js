const Ajv = require('ajv');
const regexPatterns = require('config/regexPatterns');

class Validator {
    constructor ({ LocaleService }) {
        this.LocaleService = LocaleService;
    }

    validate (domain, props, schema) {
        const ajv = new Ajv({
            allErrors: true,
            removeAdditional: true,
            messages: false,
            useDefaults: true,
        });

        const valid = ajv.validate(schema, props);
        let errors = [];

        if (!valid) {
            errors = ajv.errors.map((error) => {
                let param;

                if (error.dataPath) {
                    param = error.dataPath.split('.');
                    param.shift();

                    if (error.params.missingProperty) {
                        param.push(error.params.missingProperty);
                    }

                    param = param.join('.');
                } else {
                    param = error.params.missingProperty;
                }

                param = param.replace(
                    new RegExp(regexPatterns.removeBracketFromValidatorReturn),
                    '',
                ); // :TODO check regex

                return {
                    param,
                    message: this.LocaleService.translate(
                        `${domain}.validation.${param}.${error.keyword}`,
                    ),
                };
            });
        }

        if (errors.length > 0) {
            throw {
                code: 'VALIDATION_ERROR',
                errors,
            };
        }

        return true;
    }

    authorize () {}
}

module.exports = Validator;
