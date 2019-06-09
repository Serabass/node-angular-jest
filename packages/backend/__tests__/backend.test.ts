import {add} from '../lib/backend';

describe('backend', () => {
    it('add test', () => {
        expect(add(1, 2)).toBe(3);
    });
});
