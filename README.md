# Lisp2JS

[![Maintainability](https://api.codeclimate.com/v1/badges/ec6385ec7c10ef56e2bb/maintainability)](https://codeclimate.com/github/montmirail/lisp2js/maintainability)

A simple Lisp to JS transipler written in JavaScript.
It runs on NodeJS and uses Express to handle routing.
It is shipped with live editor interface.

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
Request
```
{
    data: "Your Lisp code to tranpile"
}
```

Response
```
{
    valid: true || false
}
```

#### POST /convertToJS
Request
```
{
    data: "Your Lisp code to tranpile"
}
```

Response
```
{
    program: "Your transpiled code"
}
```

## Specifications

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
They can take as value a hardcoded value or the result of a function.

### Function

Functions can be declared with `defun`.
The last line of a function body will be returned.

A code like this
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

### Divers

The `print` function will be converted to `console.log` in javascript.

### Examples


## Capabilities


## Limitations

- no check for already declared variable or undeclared variables
- no support for fat-arrow like function
- no list support7
- no spport for while loop
- no comments
- Needs double parenthesis for body function, even for simple operation
- Does not yet explain why or where the lisp is not valid

## Issue / Problems



## Tests

Tests can be run with the following commands:
```
npm run test
npm run test:coverage // generate coverage report
```


## Linter

Use `npm run lint` to run the linter