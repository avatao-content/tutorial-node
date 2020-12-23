const express = require('express')
const { sdk } = require('@avatao/tfwsdk');

const app = express()
const port = 11111


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/state', (req, res) => {
  res.send(sdk.fsmState.toString())
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
