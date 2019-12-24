var express = require('express')
var app = express()
require('./src/TruliooClient')(app);

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000)