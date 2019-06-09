import 'reflect-metadata';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import {
    defaultFieldResolver,
    DirectiveLocation,
    GraphQLDirective,
    GraphQLInterfaceType,
    GraphQLObjectType,
} from 'graphql';
import reflect from '../reflect';
import * as path from 'path';

export class ModelStaticMethodDirective extends SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName: any, schema: any) {
        return new GraphQLDirective({
            name: directiveName,
            locations: [
                DirectiveLocation.FIELD_DEFINITION,
            ],
            args: {
            }
        });
    }

    visitFieldDefinition(field: any, details: { objectType: GraphQLObjectType | GraphQLInterfaceType }) {
        let staticMethods = Reflect.getMetadata('graphql:staticMethods', reflect);
        let modelData = Reflect.getMetadata('graphql:model', reflect);
        let modelPath = modelData.args.model;
        let model = require(path.join(process.cwd(), 'lib', modelPath)).default;
        let name = field.name;

        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args: any[]) {
            return model[name](...args);
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
