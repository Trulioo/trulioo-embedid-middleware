const request = require('request')

function TruliooClient(req, res, next) {

    const headers = {
        "x-trulioo-api-key": `${process.env.API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "trulioo-proxy/1.0.0.0",
        "rejectUnauthorized": false,
        "Access-Control-Allow-Origin": "*"
    }

    const url = 'http://localhost:8855/generateAccessToken';

    request({ method: 'GET', url: url, headers: headers },
        (error, _, body) => {
            if (error) {
                throw new Error(error)
            }
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Content-Type', 'application/json')
            res.send(body)
            next();
        })
}

module.exports = TruliooClient;