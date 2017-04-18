import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'

const ObjectID = mongodb.ObjectID
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hibari'
const PORT = process.env.PORT || 4000

// Databases
const USERS = 'users'
const LIBRARY = 'library'

const app = express()
app.use(bodyParser.json())

// Create database outside connection to reuse connection pool
let db

mongodb.MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  // Save database object for reuse
  db = database
  console.log('Database connection ready')

  // Initialise the app
  const server = app.listen(PORT, () => {
    const port = server.address().port
    console.log('App running on port', port)
  })
})

// Static assets
app.use(express.static('public'))

// Generic error handler used by all endpoints
function handleError (res, reason, message, code) {
  console.log('ERROR:', reason)
  res.status(code || 500).json({ 'error': message })
}

app.get('/api/users', (req, res) => {
  db.collection(USERS).find({}).toArray((err, data) => {
    if (err) handleError(res, err.message, 'Failed to get users')
    else res.status(200).json(data)
  })
})

app.get('/api/users/:slug', (req, res) => {
  db.collection(USERS).findOne({ name: req.params.slug }, (err, data) => {
    if (err) handleError(res, err.message, 'Failed to get user')
    else res.status(200).json(data)
  })
})

// Vue
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})
