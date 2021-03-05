module.exports = function (req, res, next) {
    if (req.params) {
        for (const [ param, value ] of Object.entries(req.params)) {
            const casted = parseInt(value);

            if (!isNaN(casted)) {
                req.params[param] = casted;
            }
        }
    }

    next();
};
