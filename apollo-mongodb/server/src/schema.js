const {gql} = require('apollo-server');
const typeDefs = gql`

type Readme {
  identifier: ID!
  provenance: String
  source: String
  synopsis: String
  related_to: String
  scientific_name: String
  taxid: Int
  scientific_name_abbrev: String
  genotype: [String]
  description: String
  bioproject: String
  sraproject: String
  dataset_doi: String
  genbank_accession: String
  original_file_creation_date: String
  local_file_creation_date: String
  dataset_release_date: String
  publication_doi: String
  publication_title: String
  contributors: String
  citation: String
  data_curators: String
  public_access_level: String
  license: String
  keywords: String
  genotyping_platform: String
  genotyping_method: String
  expression_unit: String
  geoseries: String
}

type Query {
  readmesByIdentifier(identifier: ID!): [Readme]
  readmesByGensp(gensp: String!): [Readme]
  readmesByTaxid(taxid: Int!): [Readme]
  readmeById(id: ID!): Readme
}

`;

module.exports = typeDefs;
