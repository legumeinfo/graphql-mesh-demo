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

// get all the GWAS experiment ids
const GET_GWAS_EXPERIMENTS = gql`
query GetGWASExperiments {
  gwasExperiments {
    id
    soyBaseID
    platformName
    platformDetails
    numberLociTested
    numberGermplasmTested
    comments
  }
}
`;

// full monty for displaying a GWAS with all its QTLs
const GET_GWAS_EXPERIMENT = gql`
query GetGWASExperiment($id: ID!) {
  gwasExperiment(id: $id) {
    id
    type
    soyBaseID
    platformName
    platformDetails
    numberLociTested
    numberGermplasmTested
    geneticCoordinateSystem
    sequenceCoordinateSystem
    comments
    dateEntered
    enteredBy
    QTLs {
      id
      name
      otherName
      family
      class
      experimentId
      traitSOYNumber
      type
      category
      snpId
      snpName
      pValue
      LOD
      R2
      comments
    }
  }
}
`;

// the page
function App() {

    // selectedGWAS = the GWAS id to query
    const [selectedGWAS, setSelectedGWAS] = useState('');
    function onGWASSelected({ target }) {
        setSelectedGWAS(target.value);
    }
    // the page to be rendered
    return (
        <div>
            <h2>Select a SoyBase GWAS from a list</h2>
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
    name: 'SoyBase Apollo GraphQL Demo',
    version: '0.1'
        
});


// form to select a GWAS from a predetermined list
function GWASSelector({ onGWASSelected, selectedGWAS }) {
    const { loading, error, data } = useQuery(GET_GWAS_EXPERIMENTS);
    if (loading) return <p>Loading GWAS records...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div>
            <select name="gwas" value={selectedGWAS} onChange={onGWASSelected}>
                <option key="" value="">--- select a SoyBase GWAS ---</option>
                {data.gwasExperiments.map(gwasExperiment => (
                    <option key={gwasExperiment.id} value={gwasExperiment.id}>
                        [{gwasExperiment.soyBaseID}] {gwasExperiment.numberLociTested} loci | {gwasExperiment.numberGermplasmTested} germplasms {gwasExperiment.platformName}
                    </option>
                ))}
            </select>
        </div>
    );
}

// display the selected GWAS
function GWASDisplayer({ selectedGWAS }) {
    const { loading, error, data } = useQuery(GET_GWAS_EXPERIMENT, {
        variables: { id: selectedGWAS },
    }); 
    if (loading) return <p>Loading GWAS...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <GWAS gwasExperiment={data.gwasExperiment} />
    );
}

// GWAS display component
function GWAS({ gwasExperiment }) {
    return (
        <div className="gwas">
            <h2>{gwasExperiment.soyBaseID}</h2>
            <p>
                Genotyping Platform: {gwasExperiment.platformName} ({gwasExperiment.platformDetails})
            </p>
            <p>
                {gwasExperiment.comments}
            </p>
            <ul className="qtl-header">
                <li className="class">QTL Class</li>
                <li className="name">QTL Name</li>
                <li className="soynumber">Trait Number</li>
                <li className="snp-name">SNP Name</li>
                <li className="p-value">p-value</li>
            </ul>
            { gwasExperiment.QTLs.map((qtl) =>
                <ul key={qtl.id} className="qtl">
                    <li className="class">{qtl.class}</li>
                    <li className="name">{qtl.name}</li>
                    <li className="soynumber">{qtl.traitSOYNumber}</li>
                    <li className="snp-name">{qtl.snpName}</li>
                    <li className="p-value">{qtl.pValue}</li>
                    {qtl.comments &&
                     <li className="comments">{qtl.comments}</li>
                    }
                </ul>
            )}
        </div>
    );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
