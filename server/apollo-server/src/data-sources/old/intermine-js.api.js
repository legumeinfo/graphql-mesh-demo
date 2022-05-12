const { ImjsDataSource } = require('./imjs.datasource.js');


class IntermineJsAPI extends ImjsDataSource {

  constructor(baseURL) {
    // set the baseURL required by IntermineDataSource
    //const root = 'https://mines.legumeinfo.org/legumemine';
    super(baseURL);
  }

  geneRowNames = ['name', 'genus', 'species'];

  async getGenes(start=0, size=10) {
    const page = {start, size};
    const query = {
        from: 'Gene',
        select: ['name', 'organism.genus', 'organism.species'],
      };
    return this.rows(query, page, this.geneRowNames)
  }

}


module.exports = { IntermineJsAPI };
