declare interface Options {
  apiKey?: string;
}

/**
 * Optionally takes API key and returns a callback function that makes a request 
 * to retrieve the Embed Id access token. The access token is then returned in 
 * the response back to the caller.
 * 
 * If the API key is not passed to this function, then it must be defined in an environment
 * variable called TRULIOO_API_KEY. 
 * 
 * Please note that the trulioo-embedid-client package must be used in conjunction with this middleware
 * in order to get the EmbedId public key needed to retrieve the access token.
 * 
 * @param {string=} options.apiKey - Your Trulioo API key.
 * @return {Function} Callback function that takes the request and response, and optionally takes the next function.
 */
declare function TruliooMiddleware(options?: Options) {
  declare function Callback(req: object, res: object, next?: Function): void;
  return Callback;
};

export = TruliooMiddleware;
