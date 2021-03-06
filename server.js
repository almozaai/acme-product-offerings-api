const express = require('express');
const db = require('./db');
const app = express();
const path = require('path');

app.get('/', (req,res,next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api', require('./api'));

const port = process.env.PORT || 3000;

db.syncAndSeed()
    .then(() => app.listen(port, () => console.log(`listening on port ${port}`)));
