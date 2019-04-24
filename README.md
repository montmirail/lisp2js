# Lisp2JS

[![Maintainability](https://api.codeclimate.com/v1/badges/ec6385ec7c10ef56e2bb/maintainability)](https://codeclimate.com/github/montmirail/lisp2js/maintainability)

A simple Lisp to JS transipler written in JavaScript.
It runs on NodeJS and uses Express to handle routing.
It is shipped with a live editor interface.

## How to run

To run the project, you need node and npm to be installed. Clone the project
then run this commands:
```
npm install // install all dependencies
npm run build // build the client
npm run start // start the server
```

### Endpoints

#### GET /

The live editor interface.

#### POST /isValidLisp
Accept a string with the Lisp code to test and send back `true` if the code is valid or `false` if its invalid.

Request
```
{
    data: "Your Lisp code to transpile"
}
```

Response (200 | 400)
```
{
    valid: true || false
}
```

#### POST /convertToJS
Accept a string with the Lisp code to transpile and send back the transpiled program if the provided code is valid.

Request
```
{
    data: "Your Lisp code to transpile"
}
```

Response (200 | 500)
```
{
    program: "Your transpiled code"
}
```

## Specifications

Lisp2JS only support a basic implementation of Lisp.

### Arithmetic

The service accept all basics arithmetic operators
```
(+ 4 5)
(- 4 5)
(/ 4 5)
(* 4 5)
(% 4 5)
```

### Variable

Variables can be declared with the keyword `defvar` and constants with `defconstant`.
It accepts `Integer`, `Float`, `String` and `Boolean`.

`String` are declared with double-quotes `"`.

### Function

Functions can be declared with `defun`.
The last line of a function body will be returned.

This piece of code
```
(defun area
    (a, b)
    ((* a b))
)
```

will be transpiled as
```
function area(a, b) {
    return (a * b)
};
```

### Loop

Lisp2JS support only for loop:
```
(loop for x from 0 to 10 do ( (print x) ))
```

### Branching

Lisp2JS support simple if/else branching.

```
(if (< x y) ((print x)) ((print y)))

=====

if ((x < y)) {
    console.log(x);
} else {
    console.log(y);
}
```

### Utils
- Premature return are allowed using the keywords `return-from`.
- The `print` function will be converted to `console.log` in javascript.

### Example

A simple example program that declare a function to compute an area, call the function
and print a statement depending on the result:
```
(defun area(x, y) ((* x y)))

(defconstant z (area 1 5))

(if (< z 100)
  ((print "This is a tiny area!"))
  ((print "This is a huge area!"))
)
```

## Limitations

- no check for already declared variable or undeclared variables
- no list support
- no object support
- no suport for while loop
- no support for `else if` statement
- no comments
- Needs double parenthesis for body function, even for simple operation
- Does not yet explain why or where the lisp is not valid

## Issue / Problems

While I did not stumble into any technical problems, the main issue that I faced was the
lack of knowledge on parsing textual information and having never used Lisp.
Here is how I approched those problems:

1 - I learned how to use a lexer and a parser to generate an AST
2 - I implemented a simple lexer/parser with a trial and error mindset
3 - I looked at the Common Lisp doumentation to familiarize myself with the grammar and syntax of the language
4 - I reimplemented the lexer/parser with a simpler version of Common Lisp

## Tests

Tests can be run with the following commands:
```
npm run test
npm run test:coverage // generate coverage report
```


## Linter

Use `npm run lint` to run the linter