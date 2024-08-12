const express = require('express');
const app = express();
const nankai = require('./nankai');

app.get('/', async (req, res) => {
    res.send(JSON.stringify(await nankai('nankai'), null, 4));
});

app.listen(80, () => {
    console.log('Server on');
});

