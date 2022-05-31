module.exports = {
    
    Query: {

        readmesByIdentifier: async (_, { identifier }, { dataSources }) => {
            return dataSources.readme.getReadmesByIdentifier(identifier);
        },

        readmesByGensp: async (_, { gensp }, { dataSources }) => {
            return dataSources.readme.getReadmesByGensp(gensp);
        },

        readmesByTaxid: async (_, { taxid }, { dataSources }) => {
            return dataSources.readme.getReadmesByTaxid(taxid);
        },

        readmeById: async (_, { id }, { dataSources }) => {
            return dataSources.readme.getReadmeById(id);
        },

    },
        
};

