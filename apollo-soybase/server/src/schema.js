const {gql} = require('apollo-server');
const typeDefs = gql`

# +------------------------+
# | Tables_in_soybase      |
# +------------------------+
# | gwas_experiment        |
# | gwas_qtl               |
# | locus_chromosome_table |
# | locus_map_table        |
# | locus_table            |
# | paper_table            |
# | qtl_locus_table        |
# | qtl_position_table     |
# | qtl_reference_table    |
# | qtl_table              |
# | snp_genetic_map_table  |
# | trait_table            |
# | trait_xref_table       |
# +------------------------+

# mysql> describe gwas_experiment;
# +----------------------------+--------------+------+-----+-------------+-------+
# | Field                      | Type         | Null | Key | Default     | Extra |
# +----------------------------+--------------+------+-----+-------------+-------+
# | experiment_id              | int          | NO   |     | NULL        |       |
# | experiment_type            | varchar(50)  | NO   |     | NULL        |       |
# | SoyBase_ID                 | varchar(100) | YES  |     | NULL        |       |
# | platform_name              | varchar(50)  | YES  |     | NULL        |       |
# | platform_details           | varchar(255) | YES  |     | NULL        |       |
# | number_loci_tested         | varchar(8)   | YES  |     | NULL        |       |
# | number_germplasm_tested    | varchar(6)   | YES  |     | NULL        |       |
# | genetic_coordinate_system  | varchar(50)  | YES  |     | NULL        |       |
# | sequence_coordinate_system | varchar(50)  | YES  |     | NULL        |       |
# | comments                   | varchar(255) | YES  |     | NULL        |       |
# | date_entered               | varchar(20)  | NO   |     | yyyy-mm     |       |
# | entered_by                 | varchar(128) | NO   |     | Last, First |       |
# +----------------------------+--------------+------+-----+-------------+-------+
type GWASExperiment {
  id: ID!
  type: String!
  soyBaseID: String
  platformName: String
  platformDetails: String
  numberLociTested: String
  numberGermplasmTested: String
  geneticCoordinateSystem: String
  sequenceCoordinateSystem: String
  comments: String
  dateEntered: String!
  enteredBy: String!
  QTLs: [QTL]!
}

# mysql> describe gwas_qtl;
# +------------------+--------------+------+-----+---------+-------+
# | Field            | Type         | Null | Key | Default | Extra |
# +------------------+--------------+------+-----+---------+-------+
# | gwas_id          | int          | NO   |     | 0       |       |
# | gwas_name        | varchar(100) | NO   |     |         |       |
# | other_name       | varchar(100) | YES  |     | NULL    |       |
# | gwas_family      | varchar(100) | NO   |     |         |       |
# | gwas_class       | varchar(30)  | NO   |     |         |       |
# | experiment_id    | int          | NO   |     | NULL    |       |
# | trait_SOY_number | varchar(50)  | NO   |     |         |       |
# | QTL_type         | varchar(30)  | NO   |     |         |       |
# | QTL_category     | varchar(30)  | NO   |     |         |       |
# | snp_id           | varchar(50)  | YES  |     | NULL    |       |
# | snp_name         | varchar(30)  | NO   |     |         |       |
# | p_value          | varchar(20)  | YES  |     | NULL    |       |
# | LOD              | varchar(20)  | YES  |     | NULL    |       |
# | R2               | varchar(20)  | YES  |     | NULL    |       |
# | comments         | mediumtext   | YES  |     | NULL    |       |
# +------------------+--------------+------+-----+---------+-------+
type QTL {
  id: ID!
  name: String!
  otherName: String
  family: String!
  class: String!
  experimentId: Int!
  traitSOYNumber: String!
  type: String!
  category: String!
  snpId: String
  snpName: String!
  pValue: String
  LOD: String
  R2: String
  comments: String
}


################################################
# queries to be implemented by GraphQL clients #
################################################
type Query {
  gwasExperiment(id: ID!): GWASExperiment
  gwasExperiments: [GWASExperiment]
  qtl(id: ID!): QTL
}
`;

module.exports = typeDefs;
