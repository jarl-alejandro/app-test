const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')
const Tasks = require('./Tasks')

const PORT = process.env.PORT || 4001
const app = new express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors('*'))

app.get('/tasks', async (req, res) => {
  const tasks = await Tasks.find({})
  res.send(tasks)
})

app.get('/', (req, res) => {
  res.send('api of tasks')
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
