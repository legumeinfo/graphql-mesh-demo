module.exports = {
    
    Query: {

        gwasExperiment: async (_, { id }, { dataSources }) => {
            return dataSources.soyBaseAPI.getGWASExperiment(id);
        },

        gwasExperiments: async (_, __, { dataSources }) => {
            return dataSources.soyBaseAPI.getGWASExperiments();
        },

        qtl: async (_, { id }, { dataSources }) => {
            return dataSources.soyBaseAPI.getQTL(id);
        }
    },

    // GWASExperiment attribute resolvers
    GWASExperiment: {
        QTLs: async (gwasExperiment, { },  { dataSources }) => {
            return dataSources.soyBaseAPI.getQTLs(gwasExperiment.id);
        },
    },
        
};

