const returnType = require('./returnType');

const flatten = (obj, nonFlatFields = [], prefix = '', res = {}) => {
    return Object.entries(obj).reduce((r, [ key, val ]) => {
        const k = `${prefix}${key}`;

        if (returnType(val) === 'Object') {
            if (nonFlatFields.length) {
                if (!nonFlatFields.includes(`${key}`)) {
                    flatten(val, [], `${k}.`, r);
                } else {
                    res[k] = val;
                }
            } else {
                flatten(val, [], `${k}.`, r);
            }
        } else {
            res[k] = val;
        }

        return r;
    }, res);
};

module.exports = flatten;
