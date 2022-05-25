import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

import './index.css';
import './App.css';

import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    name: 'React Apollo Client',
    version: '0.1',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);


