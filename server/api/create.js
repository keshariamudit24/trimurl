import { buildShortCode, createUrl, lookupUrl } from '../lib/shortener.js'
import { prisma } from '../lib/prisma.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default async function handler(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value))

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

  let body = req.body || {}
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ msg: 'Invalid JSON body' })
    }
  }

  const longUrl = typeof body.longurl === 'string' ? body.longurl.trim() : ''
  const alias = typeof body.alias === 'string' ? body.alias.trim() : ''

  if (!longUrl) {
    return res.status(400).json({ msg: 'Please enter a URL' })
  }

  const existingLongUrl = await lookupUrl('longUrl', longUrl)
  if (existingLongUrl) {
    return res.json({ msg: `url already exists, go to ${existingLongUrl.shortUrl}` })
  }

  if (alias) {
    const existingShortUrl = await lookupUrl('shortUrl', alias)
    if (existingShortUrl) {
      return res.json({ msg: `url already exists, go to : ${existingShortUrl.shortUrl}` })
    }

    await createUrl(longUrl, alias)
    return res.status(200).json({ msg: 'url created successfully' })
  }

  const secretKey = process.env.SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ msg: 'SECRET_KEY is not configured' })
  }

  const id = await createUrl(longUrl, alias)
  const hash = buildShortCode(id, secretKey)

  await prisma.Url.update({
    where: {
      id,
    },
    data: {
      shortUrl: hash,
    },
  })

  return res.status(200).json({ msg: 'Url has been shortened', hash })
}
