const AbstractTransactionRepository = require('./AbstractTransactionRepository');
const MongooseQuery = require('src/infrastructure/database/v1/mongo/utils/MongooseQuery');
const { createFlatObject } = require('src/infrastructure/utils');

module.exports = class AbstractEntityRepository extends AbstractTransactionRepository {
    filterTypes = {
    };
    translateFields = []
    nonFlatFields= [];
    outputs = {
        REPO_DUPLICATE_ERROR: 'REPO_DUPLICATE_ERROR',
        VALIDATION_ERROR: 'VALIDATION_ERROR',
    }

    constructor (Model, collectionName, LocaleService) {
        super();
        this.Model = Model;
        this.collectionName = collectionName;
        this.LocaleService = LocaleService;
    }

    async create (data, locale, currentUser = {}, options, preventTranslation = false) {
        let query;

        if (!preventTranslation) {
            this.#createTranslatedField(data, locale);
        }

        // for transactions data should be array
        if (options) {
            query = [ { ...data, createdBy: currentUser._id, updatedBy: currentUser._id } ];
        } else {
            query = { ...data, createdBy: currentUser._id, updatedBy: currentUser._id };
        }


        const createdData = await this.Model.create(
            query,
            this.getSessionOptionsIfExists(options),
        ).catch(error => {
            return this.errorHandler(error, options);
        });

        if (options) { // when we use session the createdData is array
            return createdData[0].toObject();
        }

        return createdData.toObject();
    }

    async insertMany (data, locale, options, currentUser = {}, preventTranslation = false, useId = false) {
        for await (const value of data) {
            value.createdBy = currentUser._id;
            value.updatedBy = currentUser._id;

            if (!preventTranslation) {
                this.#createTranslatedField(value, locale);
            }
        }

        return await this.Model.insertMany(data, options).catch(error => {
            return this.errorHandler(error, options);
        });
    }

    async update (criteria, modifications, options, currentUser = {}) {
        modifications = createFlatObject(modifications, this.nonFlatFields);
        return await this.wrapWithSessionIfExists(
            this.Model.updateOne(criteria, { ...modifications, updatedBy: currentUser._id }).catch(error => {
                return this.errorHandler(error, options);
            }),
            options,
        );
    }

    async updateById (id, modifications, locale, currentUser = {}, options) {
        this.#createTranslatedField(modifications, locale);
        modifications = createFlatObject(modifications, this.nonFlatFields);
        return await this.wrapWithSessionIfExists(
            this.Model.updateOne({ _id: id }, { ...modifications, updatedBy: currentUser._id }).catch(error => {
                return this.errorHandler(error, options);
            }),
            options,
        ).then(async () => {
            return await this.findById(id, options);
        });
    }

    async destroyById (id, options) {
        try {
            const result = await this.wrapWithSessionIfExists(
                this.Model.deleteOne({ _id: id }).catch(this.errorHandler),
                options,
            );

            return result.deletedCount > 0;
        } catch (error) {
            return this.errorHandler(error, options);
        }
    }

    async destroyByQuery (query = {}, options) {
        try {
            const result = await this.wrapWithSessionIfExists(
                this.Model.deleteMany(query),
                options,
            );
            return result.deletedCount > 0;
        } catch (error) {
            return this.errorHandler(error, options);
        }
    }

    async count (filter, options) {
        return await this.wrapWithSessionIfExists(
            this.Model.countDocuments(filter).catch(this.errorHandler),
            options,
        );
    }

    async findById (id, options) {
        return await this.wrapWithSessionIfExists(
            this.Model.findById(id).lean()
                .catch(error => {
                    return this.errorHandler(error, options);
                }),
            options,
        );
    }

    async findOne (
        { fields, criteria },
        forceTranslatedFields = true,
        queryEntityRelations,
        customFilterTypes = {},
    ) {
        criteria = this.formatCriteria(criteria || {}, { ...this.filterTypes, ...customFilterTypes });

        if (forceTranslatedFields) {
            criteria = [ ...criteria, ...this.getExistenceQuery() ];
        }

        const query = MongooseQuery.forOne({
            criteria,
            translateFields: this.translateFields,
        });
        return await this.Model.findOne(query.criteria(queryEntityRelations))
            .select(fields)
            .lean()
            .catch(this.errorHandler);
    }

    getExistenceQuery = () => {
        return this.translateFields.map(field => ([ field, 'exists', true ]));
    }


    #getFullExistenceQuery = (query, languages) => {
        this.translateFields.map(field => {
            languages.map(language => {
                query[`${field}.${language}`] = false;
            });
        });
        return query;
    }

    checkFullExistence = async (query, languages, queryEntityRelations) => {
        const criteria = this.#getFullExistenceQuery(query, languages);
        return await this.findOne({ criteria }, undefined, false, queryEntityRelations) !== null;
    }

    checkExistence = async (params, forceTranslatedFields = false, customFilterTypes) => {
        return await this.findOne(params, forceTranslatedFields, undefined, customFilterTypes) !== null;
    }

    formatCriteria = (criteria, filterTypes) => {
        return criteria ? Object.entries(criteria).map(
            ([ key, value ]) => ([ key, filterTypes[key], value ]),
        ) : [];
    }
    findAndCountAll = async ({
        fields,
        criteria,
        limit,
        page,
        orderBy,
        orderType,
        populates,
    }, customFilterTypes = {}, queryEntityRelations) => {
        let populateCriteria = [];
        criteria = this.formatCriteria(criteria, { ...this.filterTypes, ...customFilterTypes });
        const query = MongooseQuery.forList({
            limit,
            page,
            orderBy,
            orderType,
            criteria,
            translateFields: this.translateFields,
        });

        try {
            let rows = this.Model.find(query.criteria(queryEntityRelations))
                .skip(query.skip)
                .limit(query.limit)
                .sort(query.sort)
                .select(fields);

            if (populates && populates.length) {
                for (const doc of populates) {
                    rows.populate(doc);

                    if (doc.criteria) {
                        populateCriteria = [ ...populateCriteria, ...doc.criteria ];
                    }
                }
            }

            rows = await rows.lean();

            if (populateCriteria.length > 0) {
                rows = this.applyPopulateCriteria(rows, populateCriteria);
            }

            const count = await this.Model.countDocuments(query.criteria());
            return { rows, count };
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    findAll = async ({
        fields,
        criteria,
        limit,
        page,
        orderBy,
        orderType,
        populates,
    }, locale, forceTranslatedFields = true) => {
        let populateCriteria = [];
        criteria = this.formatCriteria(criteria, this.filterTypes);

        if (forceTranslatedFields) {
            criteria = [ ...criteria, ...this.getExistenceQuery() ];
        }

        const query = MongooseQuery.forList({
            limit,
            page,
            orderBy,
            orderType,
            criteria,
            filterTypes: this.filterTypes,
            translateFields: this.translateFields,
            locale,
        });

        try {
            let rows = this.Model.find(query.criteria())
                .skip(query.skip)
                .limit(query.limit)
                .sort(query.sort)
                .select(fields);

            if (populates && populates.length) {
                for (const doc of populates) {
                    rows.populate(doc);

                    if (doc.criteria) {
                        populateCriteria = [ ...populateCriteria, ...doc.criteria ];
                    }
                }
            }

            rows = await rows.lean();

            if (populateCriteria.length > 0) {
                rows = this.applyPopulateCriteria(rows, populateCriteria);
            }

            return rows;
        } catch (error) {
            return this.errorHandler(error);
        }
    }
    aggregation = async ({
        criteria,
        limit,
        page,
        orderBy,
        orderType,
        pipeline,
        projections,
    }, { fromCollection = null, variables = {}, as }, locale, forceTranslatedFields, customFilterTypes = {}) => {
        let pipelineQuery;
        const aggregationArray = [];
        criteria = this.formatCriteria(criteria, { ...this.filterTypes, ...customFilterTypes });

        if (forceTranslatedFields) {
            criteria = [ ...criteria, ...this.getExistenceQuery() ];
        }

        const query = MongooseQuery.forList({
            limit,
            page,
            orderBy,
            orderType,
            criteria,
            filterTypes: this.filterTypes,
            translateFields: this.translateFields,
            locale,
        });
        aggregationArray.push({ $match: query.criteria() });

        if (fromCollection && pipeline) {
            pipeline = this.formatCriteria(pipeline, { ...this.aggregatePipelineTypes, ...customFilterTypes });
            pipelineQuery = MongooseQuery.forOne({
                criteria: pipeline,
                translateFields: this.translateFields,
                locale,
            });
            aggregationArray.push({

                $lookup: {
                    from: fromCollection,
                    let: variables,
                    pipeline: [
                        { $match: pipelineQuery.criteria() },
                    ],
                    as,
                },

            });
        }


        projections.forEach(projection => { // each project could have its own criteria for filtering
            if (projection.$project && projection.$project.schema) {
                const criteriaForProjection = this.formatCriteria(
                    projection.$project.schema.criteria,
                    { ...projection.$project.schema.filterTypes, ...customFilterTypes },
                );


                const queryForProjection = MongooseQuery.forOne({
                    criteria: criteriaForProjection,
                    translateFields: this.translateFields,
                    locale,
                });
                const criteria = queryForProjection.criteria();

                if (criteria) {
                    this.#schemaForProjection(
                        projection.$project,
                        projection.$project.schema.whereToPutCriteria,
                        criteria,
                    );
                }

                Reflect.deleteProperty(projection.$project, 'schema');
            }


            aggregationArray.push(projection);
        });

        try {
            return await this.Model.aggregate(aggregationArray)
                .skip(query.skip)
                .limit(query.limit)
                .sort(query.sort);
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    applyPopulateCriteria = (rows, criteria) => {
        // sample criteria:
        // criteria: [
        //     { localKey: 'templateId', refKey: 'status', value: 'published' },
        //     { localKey: 'templateId', refKey: 'status', value: 'archived' },
        // ],
        return rows.filter(row => {
            let matched = true;
            criteria.forEach((pc) => {
                Object.entries(pc).forEach(([ operator, criterion ]) => {
                    matched = operator === 'and';
                    criterion.forEach(({ localKey, refKey, value }) => {
                        matched = operator === 'or' ?
                            matched || row[localKey][refKey] === value :
                            matched && row[localKey][refKey] === value;
                    });
                });
            });
            return matched;
        });
    }


    #createTranslatedField = (data, locale) => {
        this.translateFields.map((field) => {
            if (data[field]) {
                const temp = data[field];
                delete data[field];
                data[field] = {};
                data[field][locale] = temp;
            }
        });
    };
    #schemaForProjection = (schema, placeToBe, criteria) => {
        const splitted = placeToBe.split('.');
        let data = schema[splitted[0]];

        for (let i = 1; i < splitted.length - 1; i++) {
            data = data[splitted[i]];
        }

        data.cond = criteria;
    };


    errorHandler = async (error, options) => {
        // if there is a transaction, abort it
        if (options && options.session) {
            await options.session.abortTransaction();
        }

        if (error.message.indexOf('Cast to ObjectId failed') !== -1) {
            throw { message: `${this.collectionName} Not Found`, code: 'NOT_FOUND' };
        }

        if (error.code === 11000) {
            const { REPO_DUPLICATE_ERROR } = this.outputs;

            if (error.writeErrors) {
                throw {
                    code: 'VALIDATION_ERROR',
                    errors: this.createDuplicateError(error.writeErrors[0].err),
                };
            } else if (error.keyPattern) {
                throw {
                    code: 'VALIDATION_ERROR',
                    errors: this.createDuplicateError(error.keyPattern),
                };
            } else {
                throw {
                    ...error,
                    code: REPO_DUPLICATE_ERROR,
                };
            }
        } else {
            throw error;
        }
    };

    createDuplicateError = (error) => {
        const { VALIDATION_ERROR } = this.outputs;
        let errorParams;

        if ('errmsg' in error) {
            if (error.errmsg.includes(' index: ') && error.errmsg.includes(' dup key: ')) {
                const keysString = /.* index: (.*) dup key: /g.exec(error.errmsg)[1];
                errorParams = keysString.replace(/_1/g, '').split('_');
            }
        } else {
            errorParams = Object.keys(error);
        }

        const throwArray = [];
        errorParams
            .filter(param => this.possibleDuplicates.includes(param))
            .forEach(error => {
                throwArray.push(
                    {
                        param: error,
                        message: this.LocaleService.translate(
                            `${this.collectionName}.validation.${error}.duplicate`,
                        ),
                    },
                );
            });
        throw {
            code: VALIDATION_ERROR,
            errors: throwArray,
        };
    };
};
