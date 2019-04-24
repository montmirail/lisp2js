const {
    OPENING_PARENS,
    CLOSING_PARENS,
    INTEGER,
    SYMBOL
} = require('../constants');

const readToken = token => {
    if (token === '(') {
        return {
            type: OPENING_PARENS
        };
    } else if (token === ')') {
        return {
            type: CLOSING_PARENS
        };
    } else if (token.match(/^\d+$/)) {
        return {
            type: INTEGER,
            value: parseInt(token)
        };
    } else {
        return {
            type: SYMBOL,
            value: token
        };
    }
};

module.exports = expression => {
    expression = expression.trim();

    if (expression[0] !== '(') {
        throw new Error('Your program should start with `(`');
    }

    expression = '(' + expression + ')';

    return expression
        .split('"')
        .map((el, i) => {
            if(i % 2 === 0) {
                return el.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
            } else {
                return el.replace(/ /g, '!whitespace!').replace(/,/g, '!comma!');
            }
        })
        .join('"')
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/,/g, ' , ')
        .trim()
        .split(/\s+/)
        .map(el => el.replace(/!whitespace!/g, ' ').replace(/!comma!/g, ','))
        .map(readToken);
};