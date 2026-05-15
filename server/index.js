import express from 'express'
import shortenRoute from './routes/shortenRoute.js'
import getUrlRoute from './routes/getUrlRoute.js'
import 'dotenv/config'

const app = express();

app.use(express.json())
const PORT = process.env.PORT || 4000;

app.use('/create', shortenRoute)
app.use('/', getUrlRoute)

app.listen(PORT, () => { console.log(`listening on port : ${PORT} `) })