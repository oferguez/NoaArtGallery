import { useEffect, useState } from 'react'

function App() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const GALLERY_JSON_URL = '/gallery/gallery.json'

  useEffect(() => {
    fetch(GALLERY_JSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load gallery.')
        return res.json()
      })
      .then(setArtworks)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center p-10">Loading gallery...</div>
  if (error) return <div className="text-center text-red-500 p-10">{error.message}</div>

  return (
    <div data-theme="night" className="min-h-screen bg-base-200 text-base-content">
      <div className="navbar bg-base-100 shadow">
        <div className="navbar-start">
          <span className="text-xl font-bold px-4">Art Gallery</span>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((art, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure><img src={art.url} alt={art.title || 'Artwork'} className="object-cover h-60 w-full" /></figure>
            <div className="card-body">
              <h2 className="card-title">{art.title || `Untitled #${index + 1}`}</h2>
              {art.description && <p>{art.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
