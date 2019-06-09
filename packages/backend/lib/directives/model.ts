import {SchemaDirectiveVisitor} from 'graphql-tools';
import {DirectiveLocation, GraphQLDirective, GraphQLObjectType, GraphQLString} from 'graphql';
import 'reflect-metadata';
import reflect from '../reflect';

export class ModelDirective extends SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName: any, schema: any) {
        console.log("inside getDirectiveDeclaration", directiveName);
        return new GraphQLDirective({
            name: directiveName,
            locations: [
                DirectiveLocation.OBJECT,
            ],
            args: {
                model: {
                    type: GraphQLString,
                    defaultValue: null
                }
            }
        });
    }

    visitObject(object: GraphQLObjectType): GraphQLObjectType | void | null {
        let q = this.schema.getQueryType();
        if (q) {
            let fields = q.getFields();
            fields[object.name].resolve = () => ({});
        }
        Reflect.defineMetadata('graphql:model', {
            object,
            args: this.args
        }, reflect);
    }
}
