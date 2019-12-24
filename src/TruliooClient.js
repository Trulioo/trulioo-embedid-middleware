const request = require('request');

function TruliooClient(app) {
  const headers = {
    'x-trulioo-api-key': `${process.env.TRULIOO_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'trulioo-proxy/1.0.0.0',
    rejectUnauthorized: false,
    'Access-Control-Allow-Origin': '*',
  };
  const url = 'http://localhost:8855/generateAccessToken';

  app.get('/trulioo-api/generateAccessToken', (_, res) => {
    request({ method: 'GET', url, headers },
      (error, _, body) => {
        if (error) {
          throw new Error(error);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
      });
  });
}

module.exports = TruliooClient;
