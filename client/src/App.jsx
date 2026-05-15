import { useState } from 'react'
import './App.css'
import URLForm from './components/URLForm'
import URLList from './components/URLList'

function App() {
  const [urls, setUrls] = useState([])

  const handleUrlShortened = (newUrl) => {
    setUrls([newUrl, ...urls])
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">TrimURL</h1>
            <p className="subtitle">Shorten your long URLs instantly</p>
          </div>
        </header>

        <main className="main-content">
          <URLForm onUrlShortened={handleUrlShortened} />
          {urls.length > 0 && <URLList urls={urls} />}
        </main>

        <footer className="footer">
          <p>&copy; 2024 TrimURL. Make your links shorter and formal.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
