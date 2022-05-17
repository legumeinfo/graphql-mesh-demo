module.exports = {
    
    Query: {
        // Chromosome API
        chromosome: async (_, { identifier }, { dataSources }) => {
            return dataSources.pathQueryAPI.getChromosome(identifier);
        },
        
        // Gene API
        genes: async (_, __, { dataSources }) => {
            return dataSources.pathQueryAPI.getGenes();
        },
        gene: async (_, { identifier }, { dataSources }) => {
            return dataSources.pathQueryAPI.getGene(identifier);
        },
        genesKeywordSearch: async (_, { q }, { dataSources }) => {
            return dataSources.keywordSearchAPI.getGenesByKeywordSearch(q);
        },

        // Location API
        location: async (_, { id }, { dataSources }) => {
            return dataSources.pathQueryAPI.getLocation(id);
        },
        
        // GeneFamily API
        geneFamily: async (_, { identifier }, { dataSources }) => {
            return dataSources.pathQueryAPI.getGeneFamily(identifier);
        },

        // GWAS API
        gwases: async (_, __, { dataSources }) => {
            return dataSources.pathQueryAPI.getGWASes();
        },
        gwas: async (_, { identifier }, { dataSources }) => {
            return dataSources.pathQueryAPI.getGWAS(identifier);
        },

        // Publication API
        publication: async (_, { doi }, { dataSources }) => {
            return dataSources.pathQueryAPI.getPublication(doi);
        }
    },

    // gene attribute resolvers
    Gene: {
        geneFamily: async (gene, { },  { dataSources }) => {
            return dataSources.pathQueryAPI.getGeneFamily(gene.geneFamilyIdentifier);
        },
        location: async(gene, { }, { dataSources }) => {
            return dataSources.pathQueryAPI.getLocation(gene.chromosomeLocationId);
        },
    },

    // GWAS attribute resolvers
    GWAS: {
        publication: async (gwas, { }, { dataSources }) => {
            return dataSources.pathQueryAPI.getPublication(gwas.publicationDOI);
        },
    },

    // Location attribute resolvers
    Location: {
        chromosome: async (location, { }, { dataSources }) => {
            return dataSources.pathQueryAPI.getChromosome(location.chromosomeIdentifier);
        },
    },

};

