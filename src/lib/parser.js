const lexer = require('./lexer');
const {
    OPENING_PARENS,
    CLOSING_PARENS,
} = require('../constants');

const buildAST = tokens => {
    return tokens.reduce((ast, token) => {
        if (token.type === OPENING_PARENS) {
            ast.push([]);
        } else if (token.type === CLOSING_PARENS) {
            const current_expression = ast.pop();
            ast[ast.length - 1].push(current_expression);
        } else {
            const current_expression = ast.pop();
            current_expression.push(token);
            ast.push(current_expression);
        }
        return ast;
    }, [[]])[0][0];
};

module.exports = expression  => {
    return buildAST(lexer(expression));
};
