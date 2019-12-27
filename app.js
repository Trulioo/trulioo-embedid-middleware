const express = require('express');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

require('./src/main')(app);

app.get('/', (req, res) => {
  res.send('go to /trulioo-api/generateAccessToken 🚀');
});
