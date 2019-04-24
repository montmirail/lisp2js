const OPERATIONS = ['+', '-', '*', '/', '%', '<', '>', '<=', '>=', '==', '!='];
const KEYWORDS = ['defun', 'print', 'defvar', 'defconstant', 'if', 'return-from', 'loop' ];

const isOperation = op => OPERATIONS.includes(op);
const isKeywords = kw => KEYWORDS.includes(kw);
const parseBody = body => body.map(toJs);

const normalizeSymbol = symbol => {
    const value = symbol.split('-');

    const first = value.shift();
    const normalizedName = value.filter(el => el !== '').map(name => `${name[0].toUpperCase()}${name.slice(1)}`);

    return `${first}${normalizedName.join('')}`;
};

const toFun = input => {
    const functionName = input.shift();
    const params = input.shift().map(el => el.value).join('');
    const expressions = parseBody(input.shift());
    const body = expressions.map((el, i) => i === expressions.length - 1 ? `return ${el}`: `${el};`);

    return `function ${normalizeSymbol(functionName.value)}(${params}) {${body.join('')}};`;
};

const toLet = input => {
    const varName = input.shift().value;
    const varValue = toJs(input.shift());

    return `let ${varName} = ${varValue}`;
};

const toConst = input => {
    const constName = input.shift().value;
    const constValue = toJs(input.shift());

    return `const ${constName} = ${constValue}`;
};

const toIf = input => {
    const condition = toJs(input.shift());
    let ifBody = parseBody(input.shift());

    let elseBody;
    const elseExp = input.shift();
    if(elseExp) elseBody = parseBody(elseExp);

    let statement = `if (${condition}) {${ifBody.join('')}}`;
    if(elseBody) {
        statement += ` else { ${elseBody.join('')} }`;
    }

    return statement;
};

const toReturn = input => {
    let returnValue = toJs(input.shift());
    return `return ${returnValue}`;
};

const toPrint = input => {
    const operands = input.map(toJs);
    return `console.log(${operands});`;
};

const toLoop = input => {
    const kind = input.shift().value;
    const looper = input.shift().value;
    input.shift();
    const start = input.shift().value;
    input.shift();
    const end = input.shift().value;
    input.shift();
    const exps = parseBody(input.shift());

    if(kind !== 'for') throw new Error('This transpiler only work with for loop');

    return `for (let ${looper} = ${start} ; ${looper} < ${end} ; ${looper}++) { ${exps.join('')} }`;
};

const toKeywords = (symbol, input) => {
    switch(symbol) {
        case 'defun': return toFun(input);
        case 'defvar': return toLet(input);
        case 'defconstant': return toConst(input);
        case 'print': return toPrint(input);
        case 'if': return toIf(input);
        case 'return-from': return toReturn(input);
        case 'loop': return toLoop(input);
    }
};

const toSymbol = (symbol, input) => {
    if(isOperation(symbol)) {
        const operands = input.map(toJs);
        return `(${operands.join(` ${symbol} `)})`;
    } else if (isKeywords(symbol)) {
        return toKeywords(symbol, input);
    } else {
        // It's a function call
        const params = input.map(el => el.value);
        return (`${normalizeSymbol(symbol)}(${params.join(', ')});`);
    }
};

const toJs = input => {
    if(!Array.isArray(input)) {
        return input.value;
    }

    const first = input.shift();

    if(Array.isArray(first)) {
        return toJs(first);
    }

    return toSymbol(first.value, input);
};

module.exports = input => {
    let prog = '';
    input.forEach(exp => prog += toJs(exp));
    return prog;
};