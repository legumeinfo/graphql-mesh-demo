const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { MongoClient } = require('mongodb');

const Readme = require('./datasources/readme');

// const knexConfig = {
//     client: 'mysql',
//     connection: {
//         host : '127.0.0.1',
//         port : 3306,
//         user : 'sam',
//         password : 'samspassword',
//         database : 'soybase'
//     }
// };

// const url = 'mongodb://localhost:27017/lis';

const url = 'mongodb://localhost:27017';
const dbName = 'lis';

const client = new MongoClient(url);
client.connect();

const server = new ApolloServer({
    context: async ({req}) => {
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        readme: new Readme(client.db(dbName).collection('readme'))
    })
});

server.listen().then(() => {
    console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
    `);
});
