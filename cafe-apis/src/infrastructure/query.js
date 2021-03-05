const qs = require('qs');
const _ = require('lodash');
const axios = require('axios');

class createAQuery {
    constructor () {
        this.request = axios;
        this.numberOfTries = 5;
        this.result = {};
    }

    /**
   * A method that set a response to the result. If the filedName was given then set response under the fieldname
   * in the result object
   *
   * @param {object} response
   * @param {string} filedName
   */
    setResponse (response = {}, filedName) {
        const tempObj = filedName ? { [filedName]: response } : response;
        Object.assign(this.result, tempObj);
        return this.result;
    }

    /**
   * A recursive method which make a request if error happens try it again and again until reach the numberOfTries
   *
   * @param {object} opt
   * @param {number} currentTry
   */
    async sendRequst (opt = {}, currentTry = 0) {
        if (currentTry < this.numberOfTries) {
            try {
                return await this.request(opt);
            } catch (e) {
                return this.sendRequst(opt, currentTry + 1);
            }
        } else {
            throw new Error(
                `REQUEST FAILED,\n check the fields [ baseURL, method, ... ],
                \n Number of tries request reach ${this.numberOfTries}`,
            );
        }
    }

    /**
   * A method which filter response's fields based on the fields array
   *
   *
   * @param {array} fields
   * @param {unkonwn} data
   */
    makeResponse (fields, data) {
        if (!data) return data;
        if (!fields || !Array.isArray(fields) || fields.length === 0) return data;

        if (data && Array.isArray(data)) {
            return data.forEach((doc) => _.pick(doc, fields));
        }

        return _.pick(data, fields);
    }

    /**
   * A method that make a http request along with the query parametes then filter result's fields based on
   * the given fields (method arguments)
   *
   * @param {string} baseURL
   * @param {string} method
   * @param {object} body
   * @param {array} fields
   * @param {object} params
   */
    async makeARequestCall ({
        baseURL,
        method = 'get',
        body = {},
        fields,
        params,
        query,
    } = {}) {
        const requsetOption = {
            baseURL,
            method,
            params,
            query,
            data: body || {},
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        };

        const { data } = await this.sendRequst(requsetOption);

        return this.makeResponse(fields, data);
    }

    /**
   * A method that get an object as an argument then make a request call and return result.
   * If the object has a field with the name "includes" then make a request for every object in it then
   * append result to the result based on the field name.
   * if fields field is given then the return object is clear from other fields.
   *
   * @param {object} obj which contains e.g. { baseURL, method, params(optional), includes(optional) }
   */
    async mapObjectToRequest (obj = {}) {
        const { includes, childCanHideError, ...options } = obj;
        const response = await this.makeARequestCall(options);
        this.setResponse(response);

        // check the included array and if it is filled with objests make request
        if (includes && Array.isArray(includes) && includes.length > 0) {
            for (let i = 0; i < includes.length; i++) {
                const doc = includes[i];

                try {
                    const res = await this.makeARequestCall(doc);
                    this.setResponse(res, doc.fieldName || `child${i}`);
                } catch (e) {
                    // if child request throw error then the error returned or ignore error and make next request
                    if (childCanHideError) throw e;
                    // create a empty object if error happened
                    this.setResponse({}, doc.fieldName || `child${i}`);
                    continue;
                }
            }
        }

        return this.result;
    }

    /**
   * A method which give an array and contain of object and send the object to the mapObjectToRequest method and finally
   * send request then save the responses to an array and return it.
   *
   * @param {array} array
   */
    async mapArrayToRequest (array = []) {
        const result = [];
        if (array && Array.isArray(array) && array.length === 0) return [];

        for (const obj of array) {
            const response = await this.mapObjectToRequest(obj);
            result.push(response);
        }

        return result || [];
    }
}

module.exports = createAQuery;
