
const express = require('express');
const assert = require('assert');

const app = express();
require('../src/TruliooClient')(app);

describe('Sample Test', () => {
  it('TruliooClient creates a /trulioo-api/embedids/tokens endpoint', () => {
    const expectedTruliooAccessToken = '/trulioo-api/embedids/tokens';
    // eslint-disable-next-line no-underscore-dangle
    const { stack } = app._router;
    const result = stack.find((route) => route.route
      && route.route.path === expectedTruliooAccessToken);
    assert(result !== undefined);
  });
});
