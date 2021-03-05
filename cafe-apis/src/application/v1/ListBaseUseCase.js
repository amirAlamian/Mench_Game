// extend it from BaseUseCase if needed
class ListBaseUseCase {
    orderBy;
    orderType;
    offset;
    fields;
    filters;
    constructor (repository, orderBy, orderType, limit, offset, fields, filters) {
        this.repository = repository;
        this.orderBy = orderBy;
        this.orderType = orderType;
        this.limit = limit;
        this.offset = offset;
        this.fields = fields;
        this.filters = filters;
    }
}

module.exports = ListBaseUseCase;
