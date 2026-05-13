import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import prismaPkg from '@prisma/client'

const { PrismaClient } = prismaPkg
const shortenRoute = express.Router()
const client = new PrismaClient()

async function lookup(key, value){
    const url = await client.Url.findFirst({
        where: {
            key: value
        }
    })
    if(url) return 1
    return 0
}


shortenRoute.post('/', expressAsyncHandler(async (req, res) => {
    const { longurl, alias } = req.body

    if(lookup(longUrl, longurl)){
        res.body.json({ msg: "url already exists, go to : " + url.shortUrl })
    }

    if(alias != ""){

        if(lookup(shortUrl, alias)){
            res.body.json({ msg: "url already exists, go to : " + url.shortUrl })
        }

        const newUrl = await client.Url.create({
            data: {
                longUrl: longurl,
                shortUrl: alias
            }
        })
        res.status(200).json({ msg: "url created successfully" })
    }
    else{
        
    }
}))

export default shortenRoute