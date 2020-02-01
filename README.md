# trulioo-embedid-middleware

[![Github](https://github.com/Trulioo/trulioo-embedid-middleware/workflows/Build/badge.svg)](https://github.com/Trulioo/trulioo-embedid-node/workflows/Build/badge.svg)

`npm i trulioo-embedid-middleware`

### EmbedId Middleware for Node Applications 🚀

### **This SDK works in conjunction with the [Trulioo EmbedId Client](https://github.com/Trulioo/trulioo-embedid-client).**
**Please ensure that the client is installed and implemented on your frontend along with this backend SDK.**

Grab your `TRULIOO_API_KEY` and `TRULIOO_EMBEDID_PUBLIC_KEY` from the [Trulioo Dev Portal](https://gateway-admin.trulioo.com/) and start using EmbedID 👾

This middleware creates a `/trulioo-api/embedids/tokens/<EmbedId public key>` endpoint on your server for requests from the Trulioo EmbedId Client to hit in order to retrieve an access token. The access token is returned to your frontend and is used by the client to authorize calls made in your EmbedId integration.

## Passing your API key to EmbedId Middleware

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

// Use the Trulioo EmbedId middleware
app.use(truliooMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

### HTTP

```
const truliooMiddleware = require('trulioo-embedid-middleware')({ apiKey: <Trulioo API key> });
const http = require('http');

const server = http.createServer((req, res) => {
  // Use the Trulioo EmbedId middleware
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
