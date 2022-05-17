const {RESTDataSource} = require('apollo-datasource-rest');

function formConstraint(path, op, value) {
    return '<constraint path="'+path+'" op="'+op+'" value="'+value+'"/>';
}

function formQuery(view, sortOrder, constraint) {
    if (constraint==null) {
        return '<query model="genomic" view="'+view+'" sortOrder="'+sortOrder+' asc"></query>';
    } else {
        return '<query model="genomic" view="'+view+'" sortOrder="'+sortOrder+' asc">'+constraint+'</query>';
    }
}

// Gene view
const geneView =
      "Gene.primaryIdentifier " +      // 0
      "Gene.name " +                   // 1
      "Gene.description " +            // 2
      "Gene.strain.name " +            // 3
      "Gene.organism.name " +          // 4
      "Gene.assemblyVersion " +        // 5
      "Gene.annotationVersion " +      // 6
      "Gene.geneFamilyScore " +        // 7
      "Gene.length " +                 // 8
      "Gene.geneFamily.identifier " +  // 9  extra for GeneFamily resolution
      "Gene.chromosomeLocation.id"     // 10 extra for Location resolution

// Location view
const locationView =
      "Location.start " +                     // 0
      "Location.end " +                       // 1
      "Location.strand " +                    // 2
      "Location.locatedOn.primaryIdentifier"; // 3 extra for Chromosome resolution

// GeneFamily view
const geneFamilyView =
      "GeneFamily.identifier " +  // 0
      "GeneFamily.description";   // 1

// GWAS view
const gwasView =
      "GWAS.primaryIdentifier " +  // 0
      "GWAS.synopsis " +                  // 1
      "GWAS.description " +               // 2
      "GWAS.genotypes " +                 // 3
      "GWAS.genotypingPlatform " +        // 4
      "GWAS.genotypingMethod " +          // 5
      "GWAS.publications.doi";            // 6 extra for Publication resolution

// Publication view
const publicationView =
      "Publication.doi " +          // 0
      "Publication.title " +        // 1
      "Publication.firstAuthor " +  // 2
      "Publication.journal " +      // 3
      "Publication.volume " +       // 4
      "Publication.pages " +        // 5
      "Publication.year " +         // 6
      "Publication.pubMedId";       // 7

// Chromosome view
const chromosomeView =
      "Chromosome.primaryIdentifier " +      // 0
      "Chromosome.name " +                   // 1
      "Chromosome.strain.name " +            // 2
      "Chromosome.organism.name " +          // 3
      "Chromosome.assemblyVersion " +        // 4
      "Chromosome.length";                   // 5

class PathQueryAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://mines.legumeinfo.org/soymine/service/';
    }
    
    // query a chromosome by primaryIdentifier
    async getChromosome(identifier) {
        const sortOrder = "Chromosome.name";
        const constraint = formConstraint("Chromosome.primaryIdentifier", "=", identifier);
        const query = formQuery(chromosomeView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.chromosomeQueryResultReducer(response.results[0])
            : null;
    }

    // reduce a chromosom path query result to a Chromosome
    chromosomeQueryResultReducer(result) {
        return {
            identifier: result[0],
            name: result[1],
            strainName: result[2],
            organismName: result[3],
            assemblyVersion: result[4],
            length: result[5],
        }
    }

    // get some genes
    async getGenes() {
        const sortOrder = "Gene.primaryIdentifier";
        const constraint = formConstraint("Gene.name", "CONTAINS", "01G010100");
        const query = formQuery(geneView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? response.results.map(result => this.geneQueryResultReducer(result))
            : [];
    }

    // query a gene by primaryIdentifier
    async getGene(identifier) {
        const sortOrder = "Gene.name";
        const constraint = formConstraint("Gene.primaryIdentifier", "=", identifier);
        const query = formQuery(geneView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.geneQueryResultReducer(response.results[0])
            : null;
    }

    // reduce a gene path query result to a Gene
    geneQueryResultReducer(result) {
        return {
            identifier: result[0],
            name: result[1],
            description: result[2],
            strainName: result[3],
            organismName: result[4],
            assemblyVersion: result[5],
            annotationVersion: result[6],
            geneFamilyScore: result[7],
            length: result[8],
            geneFamilyIdentifier: result[9],
            chromosomeLocationId: result[10]
        }
    }

    // query a Location by id
    async getLocation(id) {
        const sortOrder = "Location.start";
        const constraint = formConstraint("Location.id", "=", id);
        const query = formQuery(locationView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.locationQueryResultReducer(response.results[0])
            : null;
    }

    // reduce a chromosomeLocation path query result to a Location
    locationQueryResultReducer(result) {
        return {
            start: result[0],
            end: result[1],
            strand: result[2],
            chromosomeIdentifier: result[3],
        }
    }

    // query a gene family by identifier
    async getGeneFamily(identifier) {
        const sortOrder = "GeneFamily.identifier";
        const constraint = formConstraint("GeneFamily.identifier", "=", identifier);
        const query = formQuery(geneFamilyView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.geneFamilyQueryResultReducer(response.results[0])
            : null;
    }
    
    // reduce a gene family path query result to a GeneFamily
    geneFamilyQueryResultReducer(result) {
        return {
            identifier: result[0],
            description: result[1]
        }
    }
    
    // path query all GWAS
    async getGWASes() {
        const sortOrder = "GWAS.primaryIdentifier";
        const query = formQuery(gwasView, sortOrder, null);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? response.results.map(result => this.gwasQueryResultReducer(result))
            : [];
    }

    // path query a GWAS by identifier
    async getGWAS(identifier) {
        const sortOrder = "GWAS.primaryIdentifier";
        const constraint = formConstraint("GWAS.primaryIdentifier", "=", identifier);
        const query = formQuery(gwasView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.gwasQueryResultReducer(response.results[0])
            : null;
    }

    // reduce a GWAS path query result to a GWAS
    gwasQueryResultReducer(result) {
        return {
            identifier: result[0],
            synopsis: result[1],
            description: result[2],
            genotypes: result[3],
            genotypingPlatform: result[4],
            genotypingMethod: result[5],
            publicationDOI: result[6]
        }
    };

    // query a publication by DOI
    async getPublication(doi) {
        const sortOrder = "Publication.title";
        const constraint = formConstraint("Publication.doi", "=", doi);
        const query = formQuery(publicationView, sortOrder, constraint);
        const params = {
            "query": query,
            "format": "json"
        }
        const response = await this.get('query/results', params);
        return Array.isArray(response.results)
            ? this.publicationQueryResultReducer(response.results[0])
            : null;
    }

    // reduce a publication path query result to a Publication
    publicationQueryResultReducer(result) {
        return {
            DOI: result[0],
            title: result[1],
            firstAuthor: result[2],
            journal: result[3],
            volume: result[4],
            pages: result[5],
            year: result[6],
            PMID: result[7]
        }
    }

    //         location: {
    //             seqname: result[11],
    //             start: result[12],
    //             end: result[13],
    //             strand: result[14]
    //         }
    //     };
    // }


}

module.exports = PathQueryAPI;
