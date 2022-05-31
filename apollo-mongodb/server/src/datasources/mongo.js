import { MongoDataSource } from 'apollo-datasource-mongodb'

class MongoAPI extends MongoDataSource {

    async getReadme(identifier) {
        return this.findOne({
            identifier: identifier
        });
    }

}

module.exports = SoyBaseAPI;
