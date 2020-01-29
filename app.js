const express = require('express');
require('dotenv').config();
const app = express();
const port = 3010;

// Pass apiKey to imported middleware module
const TruliooMiddleware = require('./src/main')({
  apiKey: '67ce85019a7c4498a1ed74003b3dd800'
});

// Use the Trulioo EmbedId middleware
app.use(TruliooMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
