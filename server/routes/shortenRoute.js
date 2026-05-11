const express = require('express')
const shortenRoute = express.Router()
const expressAsyncHandler = require('express-async-handler')

shortenRoute.post('/', expressAsyncHandler(async (req, res) => {
    
}))

module.exports = shortenRoute