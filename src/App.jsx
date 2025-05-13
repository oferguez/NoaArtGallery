import { useEffect, useState } from 'react'

function App() {
  const [artworks, setArtworks] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArt, setSelectedArt] = useState(null)

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

  const folders = [...new Set(artworks.map(item => item.path?.split('/')[0]).filter(p => p && p !== currentPath))]

  const currentItems = artworks.filter(item => {
    const path = item.path || ''
    return path.startsWith(currentPath)
      && path.split('/').length === (currentPath ? currentPath.split('/').length + 1 : 1)
  })

  const openFolder = (folder) => {
    setCurrentPath(prev => prev ? `${prev}/${folder}` : folder)
  }

  const goUp = () => {
    if (!currentPath) return
    const parts = currentPath.split('/')
    parts.pop()
    setCurrentPath(parts.join('/'))
  }

  if (loading) return <div className="text-center p-10">Loading gallery...</div>
  if (error) return <div className="text-center text-red-500 p-10">{error.message}</div>

  return (
    <div data-theme="light" className="min-h-screen bg-base-200 text-base-content">
      <div className="navbar bg-base-100 shadow">
        <div className="navbar-start">
          <span className="text-xl font-bold px-4">Art Gallery</span>
        </div>
        <div className="navbar-end px-4">
          <button className="btn btn-sm" onClick={goUp} disabled={!currentPath}>..</button>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item, index) => {
          const isFolder = item.type === 'folder'
          const thumbSrc = isFolder ? "/folder-icon.svg" : `${item.url}`

          return (
            <div
              key={index}
              className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl"
              onClick={() => isFolder ? openFolder(item.name) : setSelectedArt(item)}
            >

              <figure className="h-60 overflow-hidden">
                <img
                  src={thumbSrc}
                  alt={item.title || item.name}
                  className="object-cover w-full h-full"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{item.title || item.name}</h2>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          )
        })}
      </div>

      {selectedArt && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-base-100 p-4 rounded shadow-lg max-w-screen-md max-h-screen overflow-auto relative">
            <button className="btn btn-sm btn-error absolute top-2 right-2" onClick={() => setSelectedArt(null)}>×</button>
            <img src={selectedArt.url} alt={selectedArt.title} className="max-w-full max-h-[80vh]" />
            <div className="mt-2 text-center">
              <h2 className="text-lg font-bold">{selectedArt.title}</h2>
              {selectedArt.description && <p>{selectedArt.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
