### ln-addr-test

Simple Express server for testing Lightning Addresses with a LN service. Conforms to the spec outlined at [lightning-address](https://github.com/andrerfneves/lightning-address/blob/master/README.md) for generating an LNURL pay object.

Configured to run with an LND backend. Requires a `.env` file in the root with the following values:
```
MACAROON=<macaroon hex>
TLS_PATH=<tls cert path>
LND_PORT=<port>
LND_HOST=<host>
```

Setup:
`npm install`

To run:
`npm start`

Example:
lnurlp endpoint:

```sh
curl http://127.0.0.1:3003/.well-known/lnurlp/testman
```
Returns:
`{"tag":"payRequest","callback":"http://127.0.0.1:3003/payment-request/id-1234"}`

lnurl payment request:

```sh
curl http://127.0.0.1:3003/payment-request/id-1234\?amount\=10000
```
Returns lnurl pr