import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_READMES } from './queries';
import './App.css';
import { Readme } from './Readme';
function App() {
    const [identifier, setIdentifier] = useState('');
    function onReadmeSelected({ target }) {
        setIdentifier(target.value);
    }
    const { loading, error, data } = useQuery(GET_READMES, {
        variables: { gensp: "medtr" },
    });
    if (loading) return <p>Loading READMEs...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div className="App">
            <h1>MongoDB-backed README content</h1>
            {data.readmesByGensp.map(readme => (
                <div className="readme" key={readme.identifier}>
                    {readme.identifier}
                    <div className="synopsis">
                        {readme.synopsis}
                        <button value={readme.identifier} onClick={onReadmeSelected}>expand</button>
                    </div>
                    {readme.identifier===identifier &&
                     <Readme readme={readme} />
                    }
                </div>
            ))}
        </div>
    );
}

export default App;
