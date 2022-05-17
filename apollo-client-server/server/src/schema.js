const {gql} = require('apollo-server');

const typeDefs = gql`
interface SequenceFeature {
  identifier: ID!
  name: String
  description: String
  strainName: String
  organismName: String
  assemblyVersion: String
  annotationVersion: String
  length: Int
  location: Location
}

type Location {
  chromosome: Chromosome
  start: Int
  end: Int
  strand: String
}

type Chromosome {
  identifier: ID!
  name: String
  strainName: String
  organismName: String
  assemblyVersion: String
  length: Int
}

type Gene implements SequenceFeature {
  identifier: ID!
  name: String
  description: String
  strainName: String
  organismName: String
  assemblyVersion: String
  annotationVersion: String
  length: Int
  location: Location
  geneFamilyScore: Float
  geneFamily: GeneFamily
}

type GeneFamily {
  identifier: ID!
  description: String
}

type GWAS {
  identifier: ID!
  synopsis: String
  description: String
  genotypes: String
  genotypingPlatform: String
  genotypingMethod: String
  publication: Publication
}

type Publication {
  DOI: ID!
  title: String
  firstAuthor: String
  journal: String
  volume: String
  pages: String
  year: Int
  PMID: Int
}

################################################
# queries to be implemented by GraphQL clients #
################################################
type Query {
  gene(identifier: ID!): Gene!
  genes: [Gene!]
  genesKeywordSearch(q: String!): [Gene]
  location(id: ID!): Location!
  geneFamily(identifier: ID!): GeneFamily!
  gwases: [GWAS!]
  gwas(identifier: ID!): GWAS!
  publication(doi: ID!): Publication!
  chromosome(identifier: ID!): Chromosome
}
`;

module.exports = typeDefs;
