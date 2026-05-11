const express = require('express')
const getUrlRoute = express.Router()
const expressAsyncHandler = require('express-async-handler')

getUrlRoute.get('/', expressAsyncHandler(async (req, res) => {
    
}))

module.exports = getUrlRoute