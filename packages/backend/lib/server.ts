import {ApolloServer} from 'apollo-server-express';
import {schema} from './gql/schema';
import express from 'express';

const server = new ApolloServer({
    schema
});

const app = express();
server.applyMiddleware({
    app
});

app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
