// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // gene API
    genes: async (_source, { start, size }, { dataSources }) => {
      //return dataSources.legumemineJsAPI.getGenes(start, size);
      return dataSources.legumemineAPI.getGenes(start, size);
    },
    getGene: async (_source, { id }, { dataSources }) => {
      return dataSources.legumemineAPI.getGene(id);
    },
    // gene family API
    geneFamilies: async (_source, { start, size }, { dataSources }) => {
      return dataSources.legumemineAPI.getGeneFamilies(start, size);
    },
    getGeneFamily: async (_source, { id }, { dataSources }) => {
      return dataSources.legumemineAPI.getGene(id);
    },
  },
};


module.exports = { resolvers };
