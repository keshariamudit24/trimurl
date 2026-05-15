import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import prismaPkg from '@prisma/client'

const getUrlRoute = express.Router()
const { PrismaClient } = prismaPkg
const client = new PrismaClient()

getUrlRoute.get('/:id', expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const hash = String(id)
    const data = await client.url.findFirst({
        where: {
            shortUrl: hash
        }
    })
    if(!data){
        return res.status(404).json({ msg: "Invalid URL" })
    }
    // return res.status(301).location(data.longUrl).end()
    return res.redirect(301, data.longUrl);
}))

export default getUrlRoute