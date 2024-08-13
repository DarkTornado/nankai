const express = require('express');
const app = express();
const nankai = require('./nankai');

app.get('/', async (req, res) => {
    const line = req.query.line;
    res.set({
        'Content-Type': 'application/json; charset=utf-8'
    });
	if (['nankai', 'koya', 'senboku'].includes(line)) {
		res.send(JSON.stringify(await nankai(line), null, 4));
	} else {
		res.send('[]');
	}
});

app.listen(80, () => {
    console.log('Server on');
});

