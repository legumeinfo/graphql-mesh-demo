import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// the page
function App() {
    //
    // set state variables with React hooks
    //
    // keyword = current value of the keyword text input
    const [keyword, setKeyword] = useState('');
    function onKeywordEntry({ target }) {
        setKeyword(target.value);
    }
    // searchTerm = the keyword actually used in the search query
    const [searchTerm, setSearchTerm] = useState('');
    function onKeywordSubmitted(event) {
        setSearchTerm(keyword);
        setSelectedGene('');
        setSelectedGWAS('');
        event.preventDefault();
    }
    // selectedGene = the gene identifier to query
    const [selectedGene, setSelectedGene] = useState('');
    function onGeneSelected({ target }) {
        setSelectedGene(target.value);
        setKeyword('');
        setSearchTerm('');
        setSelectedGWAS('');
    }
    // selectedGWAS = the GWAS identifier to query
    const [selectedGWAS, setSelectedGWAS] = useState('');
    function onGWASSelected({ target }) {
        setSelectedGWAS(target.value);
        setKeyword('');
        setSearchTerm('');
        setSelectedGene('');
    }

    // the page to be rendered
    return (
        <div>
            <h2>Keyword search for a gene (limited to 5 results)</h2>
            <KeywordSearchForm onKeywordSubmitted={onKeywordSubmitted} onKeywordEntry={onKeywordEntry} keyword={keyword} />
            {searchTerm &&
             <KeywordSearchResults searchTerm={searchTerm} />
            }
            <h2>Select a gene from a list</h2>
            <GeneSelector onGeneSelected={onGeneSelected} selectedGene={selectedGene} />
            {selectedGene && 
             <GeneDisplayer selectedGene={selectedGene} />
            }
            <h2>Select a GWAS from a list</h2>
            <GWASSelector onGWASSelected={onGWASSelected} selectedGWAS={selectedGWAS} />
            {selectedGWAS &&
             <GWASDisplayer selectedGWAS={selectedGWAS} />
            }
        </div>
    );
}

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    name: 'IM Apollo Attempt',
    version: '0.1'
        
});

// only need identifier for Gene selector
const GET_GENES = gql`
  query GetGenes {
    genes {
      identifier
    }
  }
`;

// full monty for a gene query on identifier
const GET_GENE = gql`
  query GetGene($selectedGene: ID!) {
    gene(identifier: $selectedGene) {
      identifier
      name
      description
      strainName
      organismName
      annotationVersion
      assemblyVersion
      geneFamilyScore
      length
      geneFamily {
        identifier
        description
      }
      location {
        chromosome {
          identifier
          name
          length
        }
        start
        end
        strand
      }
    }
  }
`;

// keyword search does not populate length or location
const GENES_KEYWORD_SEARCH = gql`
  query GenesKeywordSearch($searchTerm: String!) {
    genesKeywordSearch(q: $searchTerm) {
      identifier
      name
      description
      strainName
      organismName
      annotationVersion
      assemblyVersion
      geneFamilyScore
      geneFamily {
        identifier
        description
      }
    }
  }
`;

// only need identifier for GWAS selector
const GET_GWASES = gql`
  query GetGWASes {
    gwases {
      identifier
    }
  }
`;

// full monty for GWAS query on identifier
const GET_GWAS = gql`
  query GetGWAS($selectedGWAS: ID!) {
    gwas(identifier: $selectedGWAS) {
      identifier
      synopsis
      description
      genotypes
      genotypingPlatform
      genotypingMethod
      publication {
        DOI
        title
        firstAuthor
        journal
        volume
        pages
        year
        PMID
      }
    }
  }
`;

// form to perform a gene keyword search
function KeywordSearchForm({ onKeywordSubmitted, onKeywordEntry, keyword }) {
    return (
        <form onSubmit={onKeywordSubmitted}>
            <input type="text" value={keyword} onChange={onKeywordEntry} />
            <button>search</button>
        </form>
    );
}

// search for genes by keyword
function KeywordSearchResults({ searchTerm }) {
    const { loading, error, data } = useQuery(GENES_KEYWORD_SEARCH, {
        variables: { searchTerm },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return data.genesKeywordSearch.length>0
        ?
        (<div>
             <h2>"{searchTerm}" results:</h2>
             {data.genesKeywordSearch.map(gene => (
                 <Gene key={gene.identifier} gene={gene} />
             ))}
         </div>)
    :
        (<div>
             <h2>"{searchTerm}" returned no results</h2>
         </div>)
    ;
}

// form to select a gene from a predetermined list
function GeneSelector({ onGeneSelected, selectedGene }) {
    const { loading, error, data } = useQuery(GET_GENES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div>
            <select name="gene" value={selectedGene} onChange={onGeneSelected}>
                <option key="" value="">--- select a gene ---</option>
                {data.genes.map(gene => (
                    <option key={gene.identifier} value={gene.identifier}>
                        {gene.identifier}
                    </option>
                ))}
            </select>
        </div>
    );
}

// display the selected gene
function GeneDisplayer({ selectedGene }) {
    const { loading, error, data } = useQuery(GET_GENE, {
        variables: { selectedGene },
    }); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <Gene gene={data.gene} />
    );
}

// form to select a GWAS from a predetermined list
function GWASSelector({ onGWASSelected, selectedGWAS }) {
    const { loading, error, data } = useQuery(GET_GWASES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div>
            <select name="gwas" value={selectedGWAS} onChange={onGWASSelected}>
                <option key="" value="">--- select a GWAS ---</option>
                {data.gwases.map(gwas => (
                    <option key={gwas.identifier} value={gwas.identifier}>
                        {gwas.identifier}
                    </option>
                ))}
            </select>
        </div>
    );
}

// display the selected GWAS
function GWASDisplayer({ selectedGWAS }) {
    const { loading, error, data } = useQuery(GET_GWAS, {
        variables: { selectedGWAS },
    }); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <GWAS gwas={data.gwas} />
    );
}

// gene display component
function Gene({ gene }) {
    return (
        <div className="gene">
            <h3>{gene.name}</h3>
            <p>
                {gene.description}
            </p>
            <p>
                <i>{gene.organismName}</i> {gene.strainName}   assembly={gene.assemblyVersion} annotation={gene.annotationVersion}  gene family score={gene.geneFamilyScore}
            </p>
            { gene.location &&
              <Location location={gene.location} />
            }
            <MineLink prefix={"gene"} identifier={gene.identifier} />
            { gene.geneFamily &&
              <GeneFamily geneFamily={gene.geneFamily} />
            }
        </div>
    );
}

// gene chromosome location display component
function Location({ location }) {
    return (
         <div className="location">
             <code>
                 {location.chromosome.name}:{location.start}-{location.end}
                 {location.strand > 0 &&
                  <span>(+)</span>
                 }
                 {location.strand < 0 &&
                  <span>(-)</span>
                 }
             </code>
         </div>
    );
}

// gene family display component
function GeneFamily({ geneFamily }) {
    return (
        <div className="genefamily">
            Gene family: <i>{geneFamily.description}</i>
            <MineLink prefix={"genefamily"} identifier={geneFamily.identifier} />
        </div>
    );
}

// GWAS display component
function GWAS({ gwas }) {
    return (
        <div className="gwas">
            <p>
                <b>{gwas.synopsis}</b>
            </p>
            <p>
                <i>{gwas.genotypes}</i>
            </p>
            <p>
                Genotyping Platform: {gwas.genotypingPlatform} ({gwas.genotypingMethod})
            </p>
            <MineLink prefix={"gwas"} identifier={gwas.identifier} />
            <p>
                {gwas.description}
            </p>
            {gwas.publication &&
             <Publication publication={gwas.publication} />
            }
        </div>
    );
}



// mine link display component
function MineLink({ prefix, identifier }) {
    return (
        <div className="minelink">
            SoyMine: <a target="_blank" rel="noopener noreferrer" href={formatReportUrl(prefix,identifier)}>{identifier}</a>
        </div>
    );
}

// publication display component
function Publication({ publication }) {
    return (
        <div className="publication">
            <div className="title">{publication.title}</div>
            <div className="citation">
                {publication.firstAuthor} et al., <i>{publication.journal}</i> <b>{publication.volume}</b> {publication.pages} ({publication.year}) PMID:{publication.PMID}
            </div>
            <div className="link">
                <a target="_blank" rel="noopener noreferrer" href={formatPublicationUrl(publication.DOI)}>{publication.DOI}</a>
            </div>
        </div>
    );
}

// utility: form a SoyMine report URL from a prefix like "gene" and an identifier
function formatReportUrl(prefix, identifier) {
    return "https://mines.legumeinfo.org/soymine/" + prefix + ":" + identifier;
}

// utility: form a publication URL from a DOI
function formatPublicationUrl(doi) {
    return "https://doi.org/" + doi;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
