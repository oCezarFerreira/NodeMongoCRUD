require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

const personRoutes = require('./routes/personRoutes')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

// Ler json / Middleware
app.use(bodyParser.json())

// rota inical
app.get('/', (req, res) => res.status(200).json({ message: 'Oi express!' }))

// rotas API
app.use('/person', personRoutes)

// entregar uma porta
mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@api-cluster.osbole5.mongodb.net/?retryWrites=true&w=majority`
)
  .then(() => {
    app.listen(5000)
    console.log('Conectamos ao MongoDB')
  })
  .catch((err) => console.log(err))

module.exports = app
