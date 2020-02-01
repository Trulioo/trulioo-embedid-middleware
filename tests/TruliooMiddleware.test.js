
const request = require('request');

jest.mock('request');

const truliooMiddleware = require('../src/TruliooMiddleware');

describe('Trulioo Middleware', () => {
  let expectedRequest;

  let publicKey;
  let backendRequestUrl;
  let apiKey;

  let req = {};
  let res = {
    setHeader: jest.fn(),
    end: jest.fn()
  };
  let next = jest.fn();

  beforeEach(() => {
    publicKey = 'testPublicKey';

    expectedRequest = {
      method: 'POST',
      url: 'https://api-gateway-admin.trulioo.com/embedids/tokens',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'embedidnode/v1.0',
      },
      json: {
        publicKey
      },
    };
    expectedResponseCallback = (error, _, body) => {
      if (error) {
        throw new Error(error);
      }
      res.end(JSON.stringify(body));
    };

    backendRequestUrl = `/trulioo-api/embedids/tokens/${publicKey}`;
    apiKey = 'testApiKey';
    req = {
      ...req,
      url: backendRequestUrl
    };
  });

  describe('API key is not given', () => {
    it('should throw api key not found error', () => {
      expect.assertions(1);
      try {
        truliooMiddleware()(req, res, next);
      } catch (error) {
        expect(error).toStrictEqual(new Error('Trulioo API key not found.'))
      }
    });
  });

  describe('API key is passed in config object', () => {
    beforeEach(() => {
      expectedRequest = {
        ...expectedRequest,
        headers: {
          ...expectedRequest.headers,
          "x-trulioo-api-key": apiKey
        }
      }

      truliooMiddleware({ apiKey })(req, res, next);
    });

    it('should make a request with the expected data', () => {
      expect(request.mock.calls[0][0]).toStrictEqual(expectedRequest);
    });

    it('should not call the next function', () => {
      expect(next).not.toHaveBeenCalled();
    })
  });

  describe('API key is passed through environment variable', () => {
    beforeEach(() => {
      expectedRequest = {
        ...expectedRequest,
        headers: {
          ...expectedRequest.headers,
          "x-trulioo-api-key": apiKey
        }
      }
      process.env.TRULIOO_API_KEY = apiKey;

      truliooMiddleware()(req, res, next);
    });

    it('should make a request with the expected data', () => {
      expect(request.mock.calls[0][0]).toStrictEqual(expectedRequest);
    });

    it('should not call the next function', () => {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Url does not match trulioo url', () => {
    beforeEach(() => {
      req = {
        ...req,
        url: "invalidurl"
      };
    });

    it('should not call the next function if next function does not exist', () => {
      truliooMiddleware({ apiKey })(req, res);

      expect(next).not.toHaveBeenCalled();
    });
  
    it('should call the next function if next function exists', () => {
      truliooMiddleware({ apiKey })(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
