const FieldTypes = require('seed/fieldType.json');
const AbstractEntityRepository = require('src/infrastructure/database/v1/mongo/utils/AbstractEntityRepository');

class CreateSettingSeeder extends AbstractEntityRepository {
    constructor (containerCradle) {
        super(containerCradle.fieldTypeModel, containerCradle.CounterRepository);
        this.logger = containerCradle.logger;
    }

    async execute () {
        return await this.insertMany(FieldTypes, 'FieldType');
    }
}

module.exports = CreateSettingSeeder;
