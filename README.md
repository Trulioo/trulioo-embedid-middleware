# trulioo-embedid-middleware

[![Github](https://github.com/Trulioo/trulioo-embedid-middleware/workflows/Build/badge.svg)](https://github.com/Trulioo/trulioo-embedid-node/workflows/Build/badge.svg)


# Onboard verified customers instantly with [EmbedID](https://gateway-admin.trulioo.com/).
Automatic form creation for any country. Get the right data at the right time for verifying new customers.

Integrating EmbedID is done in a few easy steps. this package will help you deal with stage 5. Full steps:

1. Go to [https://gateway-admin.trulioo.com](https://gateway-admin.trulioo.com/) to get access.
2. Play with the [Author](https://gateway-admin.trulioo.com/author) tool to set the look and feel that's right for your brands onboarding experience.
3. Save your settings.
4. Add a script to your frontend where you want your onboarding experience to appear.
5. **You're Here: Add Middleware to your backend to securely generate an access token for your experience.**
6. Welcome verified customers!


## Getting started with this repository
Middleware for Node Applications 🚀

Ensure you have completed steps 1-4 above.

You will have your `TRULIOO_API_KEY` and `TRULIOO_EMBEDID_PUBLIC_KEY` from the [Trulioo Dev Portal](https://gateway-admin.trulioo.com/) from step 3 with the client installed and implemented on your frontend.

This middleware creates a `/trulioo-api/embedids/tokens/<EmbedId public key>` endpoint on your server for requests from the Trulioo EmbedID Client to hit in order to retrieve an access token. The access token is returned to your frontend and is used by the client to authorize calls made in your EmbedID integration.

## Install
Install the middleware easily from [npm](https://www.npmjs.com/package/trulioo-embedid-middleware):
`npm i trulioo-embedid-middleware`

## Passing your API key to EmbedID Middleware

In order for the middleware to make transactions to our services, the API key you received from the developer portal needs to be passed.

**If the API key is not passed to the middleware at all, an error will be thrown.**

Passing the API key can be done in one of two ways described below.

### Using the config object

The easiest way to pass the API key to the middleware is through an object with the `apiKey` field:

```
require('trulioo-embedid-middleware')({ apiKey: <Trulioo API key> });
```

### Environment variable

Another way to pass the API key is through an environment variable called `TRULIOO_API_KEY`. If this is done, then the key doesn't need to be passed in an object: 

```
process.env.TRULIOO_API_KEY = <Trulioo API key>;

...

require('trulioo-embedid-middleware')();
```

## Server Integration

This SDK is compatible with any Node.js app.

The below examples show how the SDK can be integrated with Express.js and a simple HTTP server.

### Express

```
const truliooMiddleware = require('trulioo-embedid-middleware')({ apiKey: <Trulioo API key> });
const express = require('express');
const app = express();

// Use the Trulioo EmbedID middleware
app.use(truliooMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

### HTTP

```
const truliooMiddleware = require('trulioo-embedid-middleware')({ apiKey: <Trulioo API key> });
const http = require('http');

const server = http.createServer((req, res) => {
  // Use the Trulioo EmbedID middleware
  truliooMiddleware(req, res);

  req.on('end', () => {
    res.write(JSON.stringify({
      message: "hello world!"
    }));
    res.end();
  });
});

server.listen(port);
```
