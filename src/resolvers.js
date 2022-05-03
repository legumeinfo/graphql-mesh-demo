// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {

  Query: {
    // gene API
    genes: async (_source, { family, start, size }, { dataSources }) => {
      return dataSources.legumemineAPI.getGenes({family, start, size});
    },
    gene: async (_source, { id }, { dataSources }) => {
      return dataSources.legumemineAPI.getGene(id);
    },

    // gene family API
    geneFamilies: async (_source, { start, size }, { dataSources }) => {
      return dataSources.legumemineAPI.getGeneFamilies(start, size);
    },
    geneFamily: async (_source, { id }, { dataSources }) => {
      return dataSources.legumemineAPI.getGeneFamily(id);
    },
  },

  // gene attribute resolvers
  Gene: {
    geneFamily: async (gene, { }, { dataSources }) => {
      return dataSources.legumemineAPI.getGeneFamily(gene.geneFamilyId);
    }
  },


  // gene family attribute resolvers
  GeneFamily: {
    genes: async (geneFamily, { }, { dataSources }) => {
      const family = geneFamily.id;
      return dataSources.legumemineAPI.getGenes({family});
    }
  },
};


module.exports = { resolvers };
