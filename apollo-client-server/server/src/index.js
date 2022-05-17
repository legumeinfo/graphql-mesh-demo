require('dotenv').config();
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PathQueryAPI = require('./datasources/pathquery');
const KeywordSearchAPI = require('./datasources/keywordsearch');

const server = new ApolloServer({
    context: async ({req}) => {
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        pathQueryAPI: new PathQueryAPI(),
        keywordSearchAPI: new KeywordSearchAPI()
    })
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
