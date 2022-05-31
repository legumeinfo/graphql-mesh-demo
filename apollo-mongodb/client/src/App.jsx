import { useState } from 'react';
import { useQuery } from "@apollo/client";
import './App.css';

import { GET_SYNOPSES } from './queries';

import { Synopsis } from './Synopsis';
import { Readme } from './Readme';

const gensps = [
    'aesev', 'apiam', 'araca', 'arach',
    'aradu', 'arahy', 'araip', 'baubl',
    'baupu', 'bauto', 'bauva', 'cajca',
    'cerca', 'cergi', 'chafa', 'cicar',
    'fabac', 'faial', 'glyci', 'glycy',
    'glyd3', 'glydo', 'glyfa', 'glyma',
    'glyso', 'glyst', 'glysy', 'lotja',
    'lupal', 'lupan', 'medsa', 'medtr',
    'phaac', 'phalu', 'phavu', 'pissa',
    'tripr', 'trisu', 'vigan', 'vigra',
    'vigun', 'zenin'
];

function App() {
    const [gensp, setGensp] = useState(gensps[0]);
    function onGenspSelected({ target }) {
        setGensp(target.value);
    }
    const [identifier, setIdentifier] = useState('');
    function onReadmeSelected({ target }) {
        if (target.value===identifier) {
            setIdentifier('');
        } else {
            setIdentifier(target.value);
        }
    }
    const { loading, error, data } = useQuery(GET_SYNOPSES, {
        variables: { gensp: gensp },
    });
    if (loading) return <p>Loading READMEs...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div className="App">
            <h1>MongoDB-backed README content</h1>
            <select name="gensp" onChange={ onGenspSelected } value={ gensp }>
                {gensps.map(g => (
                    <option key={g} value={g} selected>{g}</option>
                ))}
            </select>
            <hr/>
            {data.readmesByGensp.map(readme => (
                <div key={readme.identifier}>
                    <Synopsis readme={readme} onReadmeSelected={onReadmeSelected} identifier={identifier} />
                    {readme.identifier===identifier &&
                     <Readme readme={readme} />
                    }
                </div>
            ))}
        </div>
    );
}

export default App;
