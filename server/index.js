import express from 'express'
import shortenRoute from './routes/shortenRoute.js'
import getUrlRoute from './routes/getUrlRoute.js'
import 'dotenv/config'

const app = express();

app.use(express.json())

// Enable CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

const PORT = process.env.PORT || 4000;

app.use('/create', shortenRoute)
app.use('/', getUrlRoute)

app.listen(PORT, () => { console.log(`listening on port : ${PORT} `) })