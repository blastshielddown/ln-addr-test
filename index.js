const config = require('dotenv').config()

const express = require('express')
const app = express()
const host = "127.0.0.1"
const port = 3003
const lnd = require('./lnd')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/.well-known/lnurlp/:username', (req, res) => {

    res.json({ tag: 'payRequest', callback: `http://${host}:${port}/payment-request/id-1234`})

  })

app.get('/payment-request/id-1234', (req, res) => {

    const amount = req.query.amount
    const request = { 
        value_msat: amount,
        memo: `test invoice`,
        expiry: 180
      };

    console.log(request);

    // Generate invoice
    lnd.lnClient.addInvoice(request, function(err, response) {
    if (err) {
        res.json(err)
    }
    else {
        // Update invoice with r_hash
        const lndResponse = response;
        const r_hash_str = Buffer.from(response.r_hash).toString('hex')

        res.json({pr: lndResponse.payment_request});
    }
    
})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})