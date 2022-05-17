const {RESTDataSource} = require('apollo-datasource-rest');

class KeywordSearchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://mines.legumeinfo.org/soymine/service/';
    }

    // perform a keyword search for genes via the facet filter, limiting to 5 results
    // NOTE: does NOT return location
    async getGenesByKeywordSearch(q) {
        const params = {
            "q": q,
            "size": 5,
            "facet_Category": "Gene"
        }
        const response = await this.get('search', params);
        return Array.isArray(response.results)
            ? response.results.map(result => this.geneKeywordSearchResultReducer(result))
            : [];
    }
    
    // reduce a gene keyword search result to a Gene
    // "relevance": 1,
    // "fields": {
    //     "primaryIdentifier": "glyma.Wm82.gnm2.ann1.Glyma.12G026900",
    //     "name": "Glyma.12G026900",
    //     "description": "photosystem II stability/assembly factor HCF136%2C ...",
    //     "strain.name": "Williams 82",
    //     "organism.name": "Glycine max",
    //     "assemblyVersion": "gnm2",
    //     "annotationVersion": "ann1",
    //     "geneFamily.identifier": "legfed_v1_0.L_LKVDXV",
    //     "geneFamilyScore": 2.6e-256,
    //     "geneFamily.description": "photosystem II stability/assembly factor HCF136, chloroplastic-like [Glycine max]"
    // },
    // "type": "Gene",
    // "id": 25689198
    geneKeywordSearchResultReducer(result) {
        return {
            identifier: result.fields["primaryIdentifier"],
            name: result.fields["name"],
            description: result.fields["description"],
            strainName: result.fields["strain.name"],
            organismName: result.fields["organism.name"],
            assemblyVersion: result.fields["assemblyVersion"],
            annotationVersion: result.fields["annotationVersion"],
            geneFamilyScore: result.fields["geneFamilyScore"],
            geneFamilyIdentifier: result.fields["geneFamily.identifier"], // extra for GeneFamily resolution
        };
    }
}

module.exports = KeywordSearchAPI;
