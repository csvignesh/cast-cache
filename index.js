'use strict';

const express = require('express');
const app = express();
const client = require('redis').createClient(process.env.REDIS_URL);

client.on("error", (err) => console.log("Error", err));
client.on("ready", (obj) => console.log("ready", obj));

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

// enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/store', function (req, res) {
    const key = req.query.k;
    const value = req.query.v;
    if (key && value) {
        client.set(key, value, (err, response) => {
            console.log(err || 'NO ERROR', ' RESPONSE: ', response, `stored ${key} = ${value}`);
        });
        res.send('DONE');
    } else {
        res.send('params missing');
    }
});

app.get('/get', function (req, res) {
    const key = req.query.k;
    if (key) {
        client.get(key, (err, data) => {
            if (err) {
                console.log('FETCH FAILED', err, data);
            } else {
                console.log('FETCH SUCCESSFUL', data);
                res.send(data);
            }
        });
    } else {
        res.send('param missing');
    }
});

app.get('/', function (req, res) {
    res.send('U have to ask the right question');
});

client.on("connect", (obj) => {
    console.log("connect", obj);

    app.listen(app.get('port'), function () {
        console.log("Node app is running at localhost:" + app.get('port'));
    });
});
