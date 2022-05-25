import { useQuery, gql } from '@apollo/client';
import './App.css';

function App() {
    const { data, loading, error } = useQuery(gql`
      query getGenes {
        genes {
          identifier
          name
          description
        }
      }
    `);
    if (loading) return (
        <div>Loading data...</div>
    );
    if (error) return (
        <div>Error: {error.message}</div>
    );
    return (
        <div className="App">
            <h1>Here be some genes (React)</h1>
            <ul>
                {data.genes.map(gene => (
                    <li key={gene.identifier}>
                        <b>{ gene.name }</b>
                        <br/>
                        { gene.description }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
