const http = require('http')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = new express()
const server = http.createServer(app)

app.set('view engine', 'pug');


app.get('/', (req, res) => {
  const link = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'http://app.a3manager.com'

  res.render('index', { link })
})

server.listen(PORT, () => {
  console.log(`Sever running in port ${PORT}`)
})