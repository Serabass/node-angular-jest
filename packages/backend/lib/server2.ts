import {ApolloServer, gql, SchemaDirectiveVisitor} from 'apollo-server';
import {defaultFieldResolver, DirectiveLocation, GraphQLDirective} from 'graphql';

class UpperCaseDirective extends SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName: any, schema: any) {
        console.log("inside getDirectiveDeclaration", directiveName);
        return new GraphQLDirective({
            name: directiveName,
            locations: [
                DirectiveLocation.FIELD_DEFINITION,
            ],
            args: {}
        });
    }

    visitFieldDefinition(field: any) {
        console.log("inside visitFieldDefinition")
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args: any[]) {
            const result = await resolve.apply(this, args);
            if (typeof result === 'string') {
                return result.toUpperCase();
            }
            return result;
        };
    }
}

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`

    #########################################
    # ONLY WORKS WITH THIS LINE UNCOMMENTED #
    #########################################
    directive @upper on FIELD_DEFINITION

    type Book {
        title: String
        author: String @upper
    }

    type Query {
        books: [Book]
    }
`;

const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        upper: UpperCaseDirective
    }
});

server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
});
