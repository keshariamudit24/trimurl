import { prisma } from './prisma.js'

const table = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export async function lookupUrl(key, value) {
  const url = await prisma.Url.findFirst({
    where: {
      [key]: value,
    },
  })

  return url || null
}

export async function createUrl(longUrl, shortUrl) {
  const newUrl = await prisma.Url.create({
    data: {
      longUrl,
      shortUrl,
    },
  })

  return newUrl.id
}

export function buildShortCode(id, secretKey) {
  let value = id ^ Number(secretKey)
  let encoded = ''

  while (value > 0) {
    const remainder = value % 62
    encoded += table[remainder]
    value = Math.floor(value / 62)
  }

  return encoded.split('').reverse().join('')
}
