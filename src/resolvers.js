// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {

  Query: {
    // organism API
    organisms: async (_source, { genus, start, size }, { dataSources }) => {
      return dataSources.legumemineAPI.getOrganisms({genus, start, size});
    },
    organism: async (_source, { id }, { dataSources }) => {
      return dataSources.legumemineAPI.getOrganism(id);
    },

    // gene API
    genes: async (_source, { organism, family, start, size }, { dataSources }) => {
      return dataSources.legumemineAPI.getGenes({organism, family, start, size});
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

  // organism attribute resolvers
  Organism: {
    genes: async (organism, { }, { dataSources }) => {
      const organism_id = organism.id
      return dataSources.legumemineAPI.getGenes(organism_id);
    },
  },

  // gene attribute resolvers
  Gene: {
    organism: async (gene, { }, { dataSources }) => {
      return dataSources.legumemineAPI.getOrganism(gene.organismId);
    },
    geneFamily: async (gene, { }, { dataSources }) => {
      return dataSources.legumemineAPI.getGeneFamily(gene.geneFamilyId);
    },
  },

  // gene family attribute resolvers
  GeneFamily: {
    genes: async (geneFamily, { }, { dataSources }) => {
      const family = geneFamily.id;
      return dataSources.legumemineAPI.getGenes({family});
    },
  },
};


module.exports = { resolvers };
