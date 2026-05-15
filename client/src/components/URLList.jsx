import { useState } from 'react'
import './URLList.css'

export default function URLList({ urls }) {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const openUrl = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Recent Shortened URLs</h2>
        <span className="count">{urls.length}</span>
      </div>

      <div className="url-list">
        {urls.map((url, index) => (
          <div key={index} className="url-item">
            <div className="url-info">
              <div className="url-pair">
                <div className="url-section original">
                  <span className="label">Original</span>
                  <p className="url-text long-url" title={url.longUrl}>
                    {url.longUrl}
                  </p>
                </div>
                <div className="arrow">→</div>
                <div className="url-section shortened">
                  <span className="label">Short</span>
                  <p className="url-text short-url">{url.fullShortUrl}</p>
                </div>
              </div>
              <span className="timestamp">
                {new Date(url.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="url-actions">
              <button
                className="action-btn copy"
                onClick={() => copyToClipboard(url.fullShortUrl, index)}
                title="Copy short URL"
              >
                {copiedId === index ? 'Copied' : 'Copy'}
              </button>
              <button
                className="action-btn open"
                onClick={() => openUrl(url.fullShortUrl)}
                title="Open in new tab"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
