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

  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' })
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
  const hash = String(id || '')

  const data = await prisma.Url.findFirst({
    where: {
      shortUrl: hash,
    },
  })

  if (!data) {
    return res.status(404).json({ msg: 'Invalid URL' })
  }

  return res.redirect(301, data.longUrl)
}
