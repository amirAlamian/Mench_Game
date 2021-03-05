module.exports = (errorParam, domain, code, LocaleService) => {
    const throwArray = [];
    errorParam.forEach(error => {
        throwArray.push(
            {
                param: error,
                message: LocaleService.translate(
                    `${domain}.validation.${error}.duplicate`,
                ),
            },
        );
    });
    throw {
        code: code,
        errors: throwArray,
    };
};
