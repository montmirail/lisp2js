const lexer = require('../../src/lib/lexer');

describe('Lexer', () => {

    it('should return a tokenized version of the Lisp code', () => {
        const lisp = `(* 4 5 )`;

        const result = lexer(lisp);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(7);
    });

    it('should throw an exception if the code does not start with a `(`', () => {
        const lisp = `* 4 5 )`;

        try {
            const result = lexer(lisp);
            expect(result).toBe(undefined);
        } catch (e) {
            expect(e.message).toBe('Your program should start with `(`');
        }
    });
});