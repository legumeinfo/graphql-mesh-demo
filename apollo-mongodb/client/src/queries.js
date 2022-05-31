import { gql } from "@apollo/client";

export const GET_README = gql`
query GetReadme($identifier: ID!) {
  readmesByIdentifier(identifier: $identifier) {
    identifier
    provenance
    source
    synopsis
    related_to
    scientific_name
    taxid
    scientific_name_abbrev
    genotype
    description
    bioproject
    sraproject
    dataset_doi
    genbank_accession
    original_file_creation_date
    local_file_creation_date
    dataset_release_date
    publication_doi
    publication_title
    contributors
    citation
    data_curators
    public_access_level
    license
    keywords
    genotyping_platform
    genotyping_method
    expression_unit
    geoseries
  }
}
`;

export const GET_SYNOPSES = gql`
query GetFullReadmes($gensp: String!) {
  readmesByGensp(gensp: $gensp) {
    identifier
    synopsis
  }
}
`;
