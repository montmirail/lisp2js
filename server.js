const express = require('express');
const bodyParser = require('body-parser');
const convertToJS = require('./src/controllers/convertToJS');
const isValidLisp = require('./src/controllers/isValidLisp');

const app = express();
app.use(bodyParser.json());

const PORT = 4040;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('/public/index.html'));
app.post('/isValidLisp', isValidLisp);
app.post('/convertToJS', convertToJS);

app
    .listen(PORT, () => {
        console.log(`> Server running on http://localhost:${PORT}`);
    });