const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')
const Tasks = require('./Tasks')

const PORT = process.env.PORT || 5002
const app = new express()
const server = http.createServer(app)

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors('*'))

app.get('/', async (req, res) => {
  const tasks = await Tasks.find({})
  const link = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'http://a3manager.com'

  res.render('index', { link, tasks })
})

app.get('/guardar', (req, res) => {
  res.render('form')
})

app.post('/register', async (req, res) => {
  await Tasks.create({ name: req.body.name })

  res.redirect('/')
})

mongoose.Promise = global.Promise
mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.database.uri, { useNewUrlParser: true })
.then(() => {
  server.listen(PORT, () => {
    console.log('Conectado a MongoDB')
    console.log(`Sever running in http://localhost:${PORT}`)
  })
})
