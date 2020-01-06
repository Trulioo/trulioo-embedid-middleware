const request = require('request');

function TruliooClient(app) {
  const headers = {
    'x-trulioo-api-key': `${process.env.TRULIOO_API_KEY}`,
    'x-trulioo-embedid-key': `${process.env.TRULIOO_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'trulioo-proxy/1.0.0.0',
    rejectUnauthorized: false,
    'Access-Control-Allow-Origin': '*',
  };

  const url = 'https://api-gateway-admin.trulioo.com/embedids/tokens';

  app.post('/trulioo-api/embedids/tokens', (_, res) => {
    request({ method: 'POST', url, headers },
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
