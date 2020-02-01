const express = require('express');
require('dotenv').config();
const app = express();
const port = 3010;

// Pass apiKey to imported middleware module (or define in TRULIOO_API_KEY environment variable)
const truliooMiddleware = require('./src/main')({
  apiKey: '<Trulioo API Key>'
});

// Use the Trulioo EmbedId middleware
app.use(truliooMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
