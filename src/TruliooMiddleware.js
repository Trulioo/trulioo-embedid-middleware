const request = require('request');

const truliooMiddleware = (config = {}) => {
  const { apiKey } = config;

  const truliooApiKey = apiKey || process.env.TRULIOO_API_KEY;
  if (!truliooApiKey) throw new Error('Trulioo API key not found.');

  const headers = {
    'x-trulioo-api-key': truliooApiKey,
    'Content-Type': 'application/json',
    'user-agent': 'embedidnodeat/v1.0',
  };

  // override default Trulioo EmbedID Base URL if it's defined as an environment variable
  const accessTokenBaseURL = process.env.TRULIOO_EMBEDID_BASE_URL || 'https://api-gateway-admin.trulioo.com';
  const url = `${accessTokenBaseURL}/embedids/tokens`;

  return (req, res, next) => {
    if (req.url.match(/\/trulioo-api\/embedids\/tokens\/\w+/)) {
      const urlParts = req.url.split('/');
      const urlPublicKey = urlParts[urlParts.length - 1];
      // override publicKey if it's passed as an environment variable
      const embedIdPublicKey = process.env.TRULIOO_EMBEDID_PUBLIC_KEY || urlPublicKey;

      try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        request({
          method: 'POST',
          url,
          headers,
          json: {
            publicKey: embedIdPublicKey
          },
        }, (error, response, body) => {
          if (error) {
            throw new Error(error);
          }
          res.statusCode = response.statusCode;
          res.end(JSON.stringify(body));
        });
      } catch (error) {
        console.log('[/trulioo-api/embedids/tokens/]', error);
      }
    } else if (next) {
      next();
    };
  }
}

module.exports = truliooMiddleware;
