'use strict';

const express = require('express');
const app = express();

app.get('/store', function (req, res) {
    res.send('done');
});

app.get('/get', function (req, res) {
    res.send('Here u go :P');
});

app.get('/', function (req, res) {
    res.send('U have to ask the right question');
});

app.listen(80, function () {
    console.log('App listening on port 80 B)');
});
