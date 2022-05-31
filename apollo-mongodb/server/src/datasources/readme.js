const { MongoDataSource } = require('apollo-datasource-mongodb');

class Readme extends MongoDataSource {

    // returns an array of one Readme (or none)
    async getReadmesByIdentifier(identifier) {
        return this.findByFields({
            identifier: identifier
        });
    }
    
    // returns an array of Readmes
    async getReadmesByGensp(gensp) {
        return this.findByFields({
            scientific_name_abbrev: gensp
        });
    }
    
    // returns many Readmes
    async getReadmesByTaxid(taxid) {
        return this.findByFields({
            taxid: taxid
        });
    }
    
    // returns a single Readme
    async getReadmeById(id) {
        return this.findOneById(id);
    }

        
            
}

module.exports = Readme;
