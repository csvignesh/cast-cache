'use strict';

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

app.get('/store', function (req, res) {
    res.send('done');
});

app.get('/get', function (req, res) {
    res.send('Here u go :P');
});

app.get('/', function (req, res) {
    res.send('U have to ask the right question');
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
