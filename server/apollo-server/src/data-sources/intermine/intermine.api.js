const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server');


// creates a Path Query constraint XML string
function intermineConstraint(path, op, value) {
  return `<constraint path='${path}' op='${op}' value='${value}'/>`;
}


// creates a Path Query XML string
function interminePathQuery(viewAttributes, sortBy, constraints=[]) {
  const view = viewAttributes.join(' ');
  const constraint = constraints.join('');
  return `<query model='genomic' view='${view}' sortOrder='${sortBy} ASC'>${constraint}</query>`;
}


// converts an InterMine result array into a GraphQL type
function result2graphqlObject(result, graphqlAttributes) {
  const entries = graphqlAttributes.map((e, i) => [e, result[i]]);
  return Object.fromEntries(entries);
}


// converts an Intermine response into an array of GraphQL types
function response2graphqlObjects(response, graphqlAttributes) {
  return response.results.map((result) => result2graphqlObject(result, graphqlAttributes));
}


// the attributes of a Gene in InterMine
const intermineOrganismAttributes = [
  'Organism.id',
  'Organism.name',
  'Organism.commonName',
  'Organism.description',
  'Organism.genus',
  'Organism.species',
];


// the attributes of a Gene in the GraphQL API
const graphqlOrganismAttributes = [
  'id',
  'name',
  'commonName',
  'description',
  'genus',
  'species',
];


// converts an Intermine response into an array of GraphQL Gene objects
function response2organisms(response) {
  return response2graphqlObjects(response, graphqlOrganismAttributes);
}


// the attributes of a Gene in InterMine
const intermineGeneAttributes = [
  'Gene.id',
  'Gene.name',
  'Gene.description',
  'Gene.organism.id',
  'Gene.geneFamily.id',
];


// the attributes of a Gene in the GraphQL API
const graphqlGeneAttributes = [
  'id',
  'name',
  'description',
  'organismId',
  'geneFamilyId',
];


// converts an Intermine response into an array of GraphQL Gene objects
function response2genes(response) {
  return response2graphqlObjects(response, graphqlGeneAttributes);
}


// the attributes of a Gene Family in InterMine
const intermineGeneFamilyAttributes = [
  'GeneFamily.id',
  'GeneFamily.identifier',
  'GeneFamily.description',
];


// the attributes of a Gene Family in the GraphQL API
const graphqlGeneFamilyAttributes = [
  'id',
  'name',
  'description',
];


// converts an Intermine response into an array of GraphQL Gene Family objects
function response2geneFamilies(response) {
  return response2graphqlObjects(response, graphqlGeneFamilyAttributes);
}


class IntermineAPI extends RESTDataSource {

  constructor(baseURL) {
      super();
      this.baseURL = baseURL;
  }

  // get an ordered, paginated list of organisms
  async getOrganisms({genus, start=0, size=10}={}) {
    const sortBy = 'Organism.name';
    const constraints = [];
    if (genus !== undefined) {
      const genusConstraint = intermineConstraint('Organism.genus', '=', genus)
      constraints.push(genusConstraint);
    }
    const query = interminePathQuery(intermineOrganismAttributes, sortBy, constraints);
    const params = {query, start, size, format: 'json'};
    return this.get('query/results', params).then(response2organisms);
  }

  // get an organism by ID
  async getOrganism(id) {
      const sortBy = 'Organism.name';
      const constraints = [intermineConstraint('Organism.id', '=', id)];
      const query = interminePathQuery(intermineOrganismAttributes, sortBy, constraints);
      const params = {query, format: 'json'};
      return this.get('query/results', params)
        .then(response2organisms)
        .then((organisms) => {
          if (!organisms.length) {
            const msg = `Organism with ID '${id}' not found`;
            throw new UserInputError(msg);
          }
          return organisms[0];
        });
  }

  // get an ordered, paginated list of genes
  async getGenes({organism, family, start=0, size=10}={}) {
    const sortBy = 'Gene.name';
    const constraints = [];
    if (organism !== undefined) {
      const organismConstraint = intermineConstraint('Gene.organism.id', '=', organism)
      constraints.push(organismConstraint);
    }
    if (family !== undefined) {
      const familyConstraint = intermineConstraint('Gene.geneFamily.id', '=', family)
      constraints.push(familyConstraint);
    }
    const query = interminePathQuery(intermineGeneAttributes, sortBy, constraints);
    const params = {query, start, size, format: 'json'};
    return this.get('query/results', params).then(response2genes);
  }

  // get a gene by ID
  async getGene(id) {
      const sortBy = 'Gene.name';
      const constraints = [intermineConstraint('Gene.identifier', '=', id)];
      const query = interminePathQuery(intermineGeneAttributes, sortBy, constraints);
      const params = {query, format: 'json'};
      return this.get('query/results', params)
        .then(response2genes)
        .then((genes) => {
          if (!genes.length) {
            const msg = `Gene with ID '${id}' not found`;
            throw new UserInputError(msg);
          }
          return genes[0];
        });
  }

  // get an ordered, paginated list of gene families
  async getGeneFamilies(start=0, size=10) {
    const sortBy = 'GeneFamily.identifier';
    const query = interminePathQuery(intermineGeneFamilyAttributes, sortBy);
    const params = {query, start, size, format: 'json'};
    return this.get('query/results', params).then(response2geneFamilies);
  }

  // get a gene family by ID
  async getGeneFamily(id) {
      const sortBy = 'GeneFamily.identifier';
      const constraints = [intermineConstraint('GeneFamily.id', '=', id)];
      const query = interminePathQuery(intermineGeneFamilyAttributes, sortBy, constraints);
      const params = {query, format: 'json'};
      return this.get('query/results', params)
        .then(response2geneFamilies)
        .then((geneFamilies) => {
          if (!geneFamilies.length) {
            const msg = `Gene Family with ID '${id}' not found`;
            throw new UserInputError(msg);
          }
          return geneFamilies[0];
        });
  }
    
}

module.exports = { IntermineAPI };
