import express from 'express'
import expressAsyncHandler from 'express-async-handler'

const getUrlRoute = express.Router()

getUrlRoute.get('/', expressAsyncHandler(async (req, res) => {
    
}))

export default getUrlRoute