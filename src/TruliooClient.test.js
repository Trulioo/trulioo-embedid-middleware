
var express = require('express')
var assert = require('assert');
var app = express()
require('./TruliooClient')(app);

describe('Sample Test', () => {
    it('TruliooClient creates a trulioo-api/generateAccessToken endpoint', () => {
        const expectedTruliooAccessToken = '/trulioo-api/generateAccessToken';
        const { stack } = app._router;
        const result = stack.find(route => route.route && route.route.path === expectedTruliooAccessToken);
        assert(result !== undefined);
    })
})