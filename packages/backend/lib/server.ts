import {typeDefs} from './gql/schema';
import {ModelDirective} from './directives/model';
import {ApolloServer} from 'apollo-server-express';
import {ModelStaticMethodDirective} from './directives/model-static-method';

const express = require('express');

// Provide resolver functions for your schema fields
const resolvers = {};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        model: ModelDirective,
        modelStaticMethod: ModelStaticMethodDirective,
    }});

const app = express();
server.applyMiddleware({
    app
});

app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
