# trulioo-embedid-node

[![Github](https://github.com/Trulioo/trulioo-embedid-node/workflows/Build/badge.svg)](https://github.com/Trulioo/trulioo-embedid-node/workflows/Build/badge.svg)

`npm i trulioo-embedid-node`

Express middleware 🚀

Grab your `TRULIOO_API_KEY` and `TRULIOO_EMBEDID_PUBLIC_KEY` from the [Trulioo Dev Portal](https://gateway-admin.trulioo.com/) and start using EmbedID 👾

```
require('trulioo-embedid-node')(app);
```

## Environment Variables

```
TRULIOO_API_KEY = [Required] Trulioo API key 
TRULIOO_EMBEDID_BASE_URL = [Optional] EmbedID Base URL
TRULIOO_EMBEDID_PUBLIC_KEY = [Optional] EmbedID Experience Public Key
```