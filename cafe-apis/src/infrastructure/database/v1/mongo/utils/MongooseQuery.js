// TODO convert to methods, there is no need for class
const mongoose = require('mongoose');

module.exports = class MongooseQuery {
    _criteria = [];
    constructor (
        limit,
        page,
        orderBy,
        orderType,
        criteria,
        translateFields,
        locale,
    ) {
        this.limit = (limit && Number(limit)) || undefined;
        this.skip = (page && Number(page) - 1) * limit || 0;
        this.sort = this._buildSort(orderBy, orderType);
        this.makeCriteria(criteria, translateFields, locale);
    }

    static forOne ({ criteria, translateFields, locale }) {
        return new MongooseQuery(
            undefined,
            undefined,
            undefined,
            undefined,
            criteria,
            translateFields,
            locale,
        );
    }

    static forList ({
        limit = undefined,
        page = undefined,
        orderBy = undefined,
        orderType = undefined,
        criteria,
        translateFields,
        locale,
    }) {
        return new MongooseQuery(
            limit,
            page,
            orderBy,
            orderType,
            criteria,
            translateFields,
            locale,
            false,
        );
    }

    appendEqual (column, value) {
        if (column === '_id') {
            value = mongoose.Types.ObjectId(value);
        }

        this._criteria.push({
            [column]: value,
        });
    }

    appendIn (column, value) {
        if (column === '_id') {
            value.map(_id => {
                return mongoose.Types.ObjectId(_id);
            });
        }

        this._criteria.push({
            [column]: {
                $in: Array.isArray(value) ? value : [ value ],
            },
        });
    }

    appendIlike (column, value) {
        this._criteria.push({
            [column]: new RegExp(value, 'i'),
        });
    }
    appendElemMatch (column, value) {
        this._criteria.push({
            [column]: { $elemMatch: value }, // value must be an object like { id: 2 }
        });
    }

    appendCustom (column, value) {
        this._criteria.push({
            [column]: value,
        });
    }
    appendEq (column, value) {
        this._criteria.push({
            $eq: [ column, value ],
        });
    }
    appendRange (column, value) {
        const { start, end } = value;

        if (start) {
            this._criteria.push({
                [column]: {
                    $gte: start,
                },
            });
        }

        if (end) {
            this._criteria.push({
                [column]: {
                    $lte: end,
                },
            });
        }
    }

    appendExists (column, exists = true) {
        this._criteria.push({
            [column]: { $exists: exists },
        });
    }

    reset () {
        this._criteria = [];
    }

    _buildSort (orderBy, orderType) {
        if (!orderBy) {
            return undefined;
        }

        if (orderBy === 'id') {
            orderBy = '_id';
        }

        return {
            [orderBy]: orderType === 'desc' ? -1 : 1,
        };
    }

    criteria (queryEntityRelations = {}) {
        if (!this._criteria.length) {
            return {};
        } else if (!Reflect.ownKeys(queryEntityRelations).length) {
            return {
                $and: this._criteria,
            };
        }

        const criteria = {};

        for (const operator in queryEntityRelations) {
            queryEntityRelations[operator].map(relation => {
                this._criteria.map(field => {
                    if (relation === Reflect.ownKeys(field)[0]) {
                        if (!criteria[operator]) {
                            criteria[operator] = [];
                        }

                        criteria[operator].push(field);
                    }
                });
            });
        }

        return criteria;
    }


    makeCriteria (criteria = [], translateFields = [], locale = '') {
        criteria.forEach(([ key, operator, value ]) => {
            if (key.startsWith('min')) {
                if (operator === 'range') {
                    key = key.charAt(3).toLowerCase() + key.substr(4);
                    value = {
                        start: value,
                    };
                }
            }

            if (key.startsWith('max')) {
                if (operator === 'range') {
                    key = key.charAt(3).toLowerCase() + key.substr(4);
                    value = {
                        end: value,
                    };
                }
            }

            key = key === 'id' ? '_id' : key;

            if (translateFields.includes(key)) {
                key = `${key}.${locale}`;
            }

            if (operator === 'like') this.appendIlike(key, value);
            else if (operator === 'in') this.appendIn(key, value);
            else if (operator === 'equal') this.appendEqual(key, value);
            else if (operator === 'range') this.appendRange(key, value);
            else if (operator === 'exists') this.appendExists(key, value);
            else if (operator === 'elemMatch') this.appendElemMatch(key, value);
            else if (operator === 'eq') this.appendEq(key, value);
            else if (operator === 'custom') this.appendCustom(key, value);
        });
    }
};
