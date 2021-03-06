require('dotenv').config()

const fs = require('fs')
const cors = require('cors')
const knex = require('knex')
const https = require('https')
const express = require('express')

const {
  saveGrid,
  getAllGrids,
  getCluesByWord,
  getCountByMask,
  getSuggestionsByMask,
} = require('./api')

const {
  SSL_KEY,
  SSL_CERT,
  APP_PORT,
  DB_HOST,
  DB_CLIENT,
  DB_DATABASE,
  DB_PASSWORD,
  DB_USERNAME,
} = process.env

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
})

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('db', db)

app.get('/crossword/words/count/:word', getCountByMask(app))
app.get('/crossword/words/find/:word', getSuggestionsByMask(app))
app.get('/crossword/clues/find/:word', getCluesByWord(app))
app.get('/crossword/grids', getAllGrids(app))

app.post('/crossword/grids', saveGrid(app))

https.createServer({
  key: fs.readFileSync(SSL_KEY),
  cert: fs.readFileSync(SSL_CERT),
}, app).listen(APP_PORT)
