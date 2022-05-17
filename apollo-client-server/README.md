# apollo-client-server

An attempt to use Apollo GraphQL server and client to query a mine and populate a page.

Right now the server and client are connected via `.env` vars that are not stored in the repo (because we're not supposed to).
You can create your own using the "Monolith" option in Apollo Studio (which is no longer the default!).

## server

The server defines a schema for a few types (Gene, GeneFamily, GWAS, Publication, etc.) and provides resolvers for a gene keyword search 
(limited to 5 results), generating a list of 10 genes for testing, querying a single gene on identifier, and similar for GWAS.
It runs on localhost:4000, but it's handy to use the Apollo Studio Explorer to play with it.

- `index.js` instantiates the server and query APIs
- `schema.js` defines the GraphQL schema **plus the Query type** (there are no mutations)
- `resolvers.js` ties the queries used in the client to the server query API methods
- `datasources/` files that define the query APIs and implement the back-end queries to populate GraphQL types
  - `keywordsearch.js` gene keyword search, query a fixed list of genes, query a gene from its identifier
  - `pathquery.js` query all GWAS, query a GWAS from its identifier, query a gene family from its identifier, etc.

## client

The (Apollo) client provides gene keyword search, select-a-gene, and select-a-GWAS. It runs on localhost:3000.

- `index.js` all the code
- `index.css` the usual
