const request = require('request');

function TruliooClient(app) {
  const headers = {
    'x-trulioo-api-key': `${process.env.TRULIOO_API_KEY}`,
    'x-trulioo-embedid-key': `${process.env.TRULIOO_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'trulioo-proxy/1.0.0.0',
  };

  // override default Trulioo EmbedID Base URL if it's defined as an environment variable
  const accessTokenBaseURL = process.env.TRULIOO_EMBEDID_BASE_URL || 'https://api-gateway-admin.trulioo.com';
  const url = `${accessTokenBaseURL}/embedids/tokens`;

  app.get('/trulioo-api/embedids/tokens/:publicKey', (req, res) => {
    try {
      // override publicKey if it's passed as an environment
      const publicKey = process.env.TRULIOO_EMBEDID_PUBLIC_KEY
        || (req.params && req.params.publicKey);

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');

      request({
        method: 'POST',
        url,
        headers,
        json: {
          apiKey: process.env.TRULIOO_API_KEY,
          publicKey,
        },
      }, (error, _, body) => {
        if (error) {
          throw new Error(error);
        }
        res.send(body);
      });
    } catch (error) {
      console.log('[/trulioo-api/embedids/tokens/]', error);
    }
  });
}

module.exports = TruliooClient;
