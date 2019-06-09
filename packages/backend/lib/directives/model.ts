import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLObjectType} from 'graphql';
import 'reflect-metadata';
import reflect from '../reflect';

export class ModelDirective extends SchemaDirectiveVisitor {
    visitObject(object: GraphQLObjectType): GraphQLObjectType | void | null {
        Reflect.defineMetadata('graphql:model', {
            object,
            args: this.args
        }, reflect);
    }
}
