import {importSchema} from 'graphql-import';
import gql from 'graphql-tag';

export const typeDefs = gql(importSchema(__dirname + '/index.graphql'));
