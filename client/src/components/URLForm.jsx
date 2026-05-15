import { useState } from 'react'
import './URLForm.css'

export default function URLForm({ onUrlShortened }) {
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
  const publicBaseUrl = (import.meta.env.VITE_PUBLIC_BASE_URL || apiBaseUrl).replace(/\/$/, '')
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!longUrl.trim()) {
      setError('Please enter a URL')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longurl: longUrl,
          alias: customAlias,
        }),
      })

      const data = await response.json()
      const message = data?.msg || ''

      if (data.hash || message.includes('created successfully')) {
        const shortUrl = data.hash || customAlias
        setSuccess(`✓ URL shortened successfully!`)
        onUrlShortened({
          longUrl,
          shortUrl,
          fullShortUrl: `${publicBaseUrl}/${shortUrl}`,
          createdAt: new Date(),
        })
        setLongUrl('')
        setCustomAlias('')
      } else if (message) {
        setError(message)
      }
    } catch (err) {
      setError(`Failed to shorten URL. Make sure the server is running at ${apiBaseUrl}.`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="form-group">
          <label htmlFor="longUrl">Long URL</label>
          <input
            id="longUrl"
            type="url"
            placeholder="https://example.com/very/long/url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="customAlias">Custom Alias (Optional)</label>
          <input
            id="customAlias"
            type="text"
            placeholder="my-custom-link"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="form-input"
            disabled={loading}
          />
          <small className="form-help">Leave blank for auto-generated short code</small>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  )
}
