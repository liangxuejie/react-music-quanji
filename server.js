const express = require('express')
const registerRouter = require('./backend/router')

const port = process.env.PORT || 9002
const app = express()
registerRouter(app)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
