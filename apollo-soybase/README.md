# apollo-soybase

An attempt to use Apollo GraphQL server and client to query the soybase mysql database.

Right now the server and client are connected via `.env` vars that are not stored in the repo (because we're not supposed to).
You can create your own using the "Monolith" option in Apollo Studio (which is no longer the default!).

## server

The server side defines a schema for GWAS experiments and their QTLs, from the `gwas_experiment` and `gwas_qtl` tables. The queries allow querying
all GWAS experiments (along with their QTLs via chaining), a single one by ID, and a single QTL by ID.

## client

Using an Apollo React client again, linked to the server via the APOLLO_KEY stored in the .env file (not in the repo). It provides a selector to
choose a GWAS experiment, which upon doing so displays that GWAS experiment's metadata along with all of its QTLs.

Here's what it looks like:

![Screenshot 2022-05-19 at 20-33-25 React App](https://user-images.githubusercontent.com/5657219/169437989-5c3e53ee-c025-43c4-8ff1-d326d28eaf19.png)
