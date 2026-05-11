const express = require('express')
const shortenRoute = require
require('dotev').config()

const app = express();

app.use(express.json())
const PORT = process.env.PORT || 4000;

app.use('/create', shortenRoute)
app.use('/', getUrlRoute)

app.listen(PORT, () => { console.log(`listening on port : ${PORT}$`) })