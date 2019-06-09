import 'reflect-metadata';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLField, GraphQLInterfaceType, GraphQLObjectType} from 'graphql';
import reflect from '../reflect';
import * as path from 'path';

export class ModelStaticMethodDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>, details: { objectType: GraphQLObjectType | GraphQLInterfaceType }): GraphQLField<any, any> | void | null {
        let staticMethods = Reflect.getMetadata('graphql:staticMethods', reflect);
        let modelData = Reflect.getMetadata('graphql:model', reflect);
        let modelPath = modelData.args.model;
        let model = require(path.join(process.cwd(), 'lib', modelPath)).default;
        let name = field.name;

        field.resolve = function () {
            console.log(name);
            return [{
                id: 0,
            }]
        };

        if (!staticMethods) {
            staticMethods = [];
        }

        staticMethods.push({
            type: field.type,
            args: this.args,
            details,
            name
        });

        Reflect.defineMetadata('graphql:staticMethods', staticMethods, reflect);
    }
}
