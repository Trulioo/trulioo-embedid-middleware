import request from 'request';

const TruliooMiddleware = (config = {}) => {
  const { apiKey } = config;
  
  const headers = {
    'x-trulioo-api-key': `${apiKey || process.env.TRULIOO_API_KEY}`,
    'Content-Type': 'application/json',
    'User-Agent': 'trulioo-proxy/1.0.0.0',
  };

  // override default Trulioo EmbedID Base URL if it's defined as an environment variable
  const accessTokenBaseURL = process.env.TRULIOO_EMBEDID_BASE_URL || 'https://api-gateway-admin.trulioo.com';
  const url = `${accessTokenBaseURL}/embedids/tokens`;

  return (req, res, next) => {
    if (req.url.match(/(.*)\/trulioo-api\/embedids\/tokens\/(.*)\w+/)) {
      const urlParts = req.url.split('/');
      const urlPublicKey = urlParts[urlParts.length - 1];

      try {
        // override publicKey if it's passed as an environment or config 
        const embedIdPublicKey = process.env.TRULIOO_EMBEDID_PUBLIC_KEY || urlPublicKey;
  
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        request({
          method: 'POST',
          url,
          headers,
          json: {
            publicKey: embedIdPublicKey
          },
        }, (error, _, body) => {
          if (error) {
            throw new Error(error);
          }
          res.end(JSON.stringify(body));
        });
      } catch (error) {
        console.log('[/trulioo-api/embedids/tokens/]', error);
      }
    } else if (next) {
      next()
    };
  }
}

export default TruliooMiddleware;
