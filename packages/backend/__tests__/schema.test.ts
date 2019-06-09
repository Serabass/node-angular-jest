import {graphql} from 'graphql';
import {schema} from '../lib/gql/schema';

describe('backend', () => {
    it('add test', async () => {
        let query = `query {
            Product {
                byId(id: 1) {
                    id
                }
            }
        }`;

        let a = await graphql(schema, query);
        expect(a).toEqual({
            data: {
                Product: {
                    byId: {
                        id: 1
                    }
                }
            }
        });
    });
});
