const parser = require('../../src/lib/parser');

describe('Parser', () => {

    it('should return a parsed version of a simple Lisp code', () => {
        const lisp = `(* 4 5 )`;

        const result = parser(lisp);


        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0].length).toBe(3);
    });

    it('should return a parsed version of a complex Lisp code', () => {
        const lisp = `(defun area(x, y) ((* x y))) (defvar z (area 1 5)) (print z)`;

        const result = parser(lisp);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(3);
        expect(result[0].length).toBe(4);
        expect(result[1].length).toBe(3);
        expect(result[2].length).toBe(2);
    });

});