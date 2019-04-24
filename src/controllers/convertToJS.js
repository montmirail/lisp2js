const beautify = require('js-beautify').js;
const transpiler = require('../lib/transpiler');
const parser = require('../lib/parser');

module.exports = (req, res) => {
    const {data} = req.body;
    const program = transpiler(parser(data));
    return res.json({ program: beautify(program) });
};