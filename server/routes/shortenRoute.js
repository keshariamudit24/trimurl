import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import prismaPkg from '@prisma/client'

const { PrismaClient } = prismaPkg
const shortenRoute = express.Router()
const client = new PrismaClient()


shortenRoute.post('/', expressAsyncHandler(async (req, res) => {
    const row = await client.Url.findFirst({
            where: {
                alias: true
            }
        }
    )
    return row
}))

export default shortenRoute