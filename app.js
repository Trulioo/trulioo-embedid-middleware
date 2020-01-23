const express = require('express');
require('dotenv').config();
const app = express();
const port = 3010;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

require('./src/main')(app);

app.get('/', (req, res) => {
  res.send('go to /trulioo-api/embedids/tokens/:publicKey 🚀');
});
