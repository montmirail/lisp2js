const parser = require('../src/lib/parser');
const transpiler = require('../src/lib/transpiler');
const beautify = require('js-beautify').js;

const code = `(
(defun area(a, b, c) ( 
    (defvar x (+ a b)) 
    (print x )
))

(area 1.5 2 3)

(if (> a 4) (
    (print a)
    (return-from a)
) (
    (print b)
    (return-from b)
))

(print "Hello World")
 
(loop for x from 0 to 10 do ( (print x) ))
   
)
`;

const transpiled = transpiler(parser(code));
console.log(beautify(transpiled));


