const transpiler = require('../lib/transpiler');
const parser = require('../lib/parser');

module.exports = (req, res) => {
    const {data} = req.body;
    try {
        transpiler(parser(data));
        return res.json({ valid: true});
    } catch (e) {
        res.status(400);
        return res.json({ valid: false });
    }
};