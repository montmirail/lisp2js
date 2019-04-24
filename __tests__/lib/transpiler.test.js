const transpiler = require('../../src/lib/transpiler');
const parser = require('../../src/lib/parser');

describe('Transpiler', () => {

    describe('Arithmetic', () => {
        it('should transiple `+`', () => {
            const lisp = `(+ 4 5 )`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('(4 + 5)');
        });

        it('should transiple `-`', () => {
            const lisp = `(- 4 5 )`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('(4 - 5)');
        });

        it('should transiple `*`', () => {
            const lisp = `(* 4 5 )`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('(4 * 5)');
        });

        it('should transiple `/`', () => {
            const lisp = `(/ 4 5 )`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('(4 / 5)');
        });

        it('should transiple `%`', () => {
            const lisp = `(% 4 5 )`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('(4 % 5)');
        });
    });

    describe('Function', () => {
        it('should correctly declare a function', () => {
            const lisp = `(defun area(x, y) ((* x y)))`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('function area(x,y) {return (x * y)};');
        });

        it('should correctly call a function', () => {
            const result = transpiler(parser('(area x y)'));

            expect(result).toBe('area(x, y);');
        });
    });

    describe('Variables', () => {
        it('should correctly declare a variable', () => {
            const result = transpiler(parser('(defvar x 5)'));

            expect(result).toBe('let x = 5');
        });

        it('should correctly declare a constant', () => {
            const result = transpiler(parser('(defconstant x 5)'));

            expect(result).toBe('const x = 5');
        });
    });

    describe('Loops', () => {
        it('should correctly manage for loops', () => {
            const lisp = `(loop for x from 0 to 10 do ( (print x) ))`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('for (let x = 0 ; x < 10 ; x++) { console.log(x); }');
        });
    });

    describe('Branchs', () => {
        it('should correctly if statement', () => {
            const lisp = `(if (< x y) ((print x)) ((print y)))`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('if ((x < y)) {console.log(x);} else { console.log(y); }');
        });
    });

    describe('Keywords', () => {
        it('should correctly transpile `print`', () => {
            const lisp = `(print "Hello World!)`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('console.log("Hello World!);');
        });

        it('should correctly transpile `return-from`', () => {
            const lisp = `(return-from true)`;
            const result = transpiler(parser(lisp));

            expect(result).toBe('return true');
        });
    });
});