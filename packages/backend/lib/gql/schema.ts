import {importSchema} from 'graphql-import';
import gql from 'graphql-tag';
import {makeExecutableSchema} from 'graphql-tools';
import {ModelDirective} from '../directives/model';
import {ModelStaticMethodDirective} from '../directives/model-static-method';

export const typeDefs = gql(importSchema(__dirname + '/index.graphql'));

// Provide resolver functions for your schema fields
const resolvers = {

};

export let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        model: ModelDirective,
        modelStaticMethod: ModelStaticMethodDirective
    }
});
