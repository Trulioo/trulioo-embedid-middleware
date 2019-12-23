var express = require('express')
var app = express()
const truliooClient = require('./TruliooClient');

app.get('/truliooAccessToken', truliooClient);


app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000)