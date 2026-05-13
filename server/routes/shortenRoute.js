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

async function create(long, short){
    const newUrl = await client.Url.create({
        data: {
            longUrl: long,
            shortUrl: short
        }
    })
    return newUrl.id
}

const table = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] 

shortenRoute.post('/', expressAsyncHandler(async (req, res) => {
    const { longurl, alias } = req.body

    if(lookup(longUrl, longurl)){
        res.body.json({ msg: "url already exists, go to : " + url.shortUrl })
    }

    if(alias != ""){

        if(lookup(shortUrl, alias)){
            res.body.json({ msg: "url already exists, go to : " + url.shortUrl })
        }

        create(longurl, alias)
        res.status(200).json({ msg: "url created successfully" })
    }
    else{ 
        id = create(longurl, alias) 
        secret_key = process.env.SECRET_KEY
        id = id ^ secret_key
        // base-62 encoding 
        num = id
        str = "";
        while(num > 0){
            rem = num % 62
            str += table[rem]
            num /= 62
        }
        const hash = str.split("").reverse().join("");
        // update
        const storeHash = await client.Url.update({
            where: {
                longUrl: longurl
            },
            data: {
                shortUrl: hash
            }
        })
        
        res.status(200).json({ msg: "Url has been shortened", hash: hash })
    }
}))

export default shortenRoute