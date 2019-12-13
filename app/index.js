const http = require('http')
const express = require('express')

const PORT = process.env.PORT || 5000
const app = new express()
const server = http.createServer(app)

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const link = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://a3manager.com'
  const api = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : 'http://api.a3manager.com'
  const io = process.env.NODE_ENV !== 'production' ? 'http://localhost:6001' : 'http://io.a3manager.com'

  const ioURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:6001/socket.io/socket.io.js' : 'http://io.a3manager.com/socket.io/socket.io.js'

  res.render('index', { link, io, api, ioURL })
})

server.listen(PORT, () => {
  console.log('Conectado a MongoDB')
  console.log(`Sever running in http://localhost:${PORT}`)
})