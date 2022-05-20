require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const SoyBaseAPI = require('./datasources/soybase');

const knexConfig = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'sam',
        password : 'samspassword',
        database : 'soybase'
    }
};


const server = new ApolloServer({
    context: async ({req}) => {
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        soyBaseAPI: new SoyBaseAPI(knexConfig),
    })
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
