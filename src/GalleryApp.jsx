import { useEffect, useState } from 'react'

console.log('Hey hey hey')

function GalleryApp() {
  console.log('Hey again')
  
  const [artworks, setArtworks] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArt, setSelectedArt] = useState(null)
  const [_sortOrder, _setSortOrder] = useState("asc")

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
  }).sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1
    if (a.type !== 'folder' && b.type === 'folder') return 1
    const nameA = (a.title || a.name || '').toLowerCase()
    const nameB = (b.title || b.name || '').toLowerCase()
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
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

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

  if (loading) return <div className="text-center p-10">Loading gallery...</div>
  if (error) return <div className="text-center text-red-500 p-10">{error.message}</div>

  return (
    <div data-theme="light" className="min-h-screen bg-base-200 text-base-content">
      <div className="navbar bg-base-100 shadow">
        <div className="navbar-start">
          <span className="text-xl font-bold px-4">Art Gallery</span>
        </div>

        <div className="navbar-end px-4 space-x-2">
          <button className="btn btn-sm" onClick={goUp} disabled={!currentPath}>..</button>
          <button className="btn btn-sm" onClick={toggleSortOrder}>
            Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>

      </div>

      <div className="p-4">
        {currentItems.some(item => item.type === 'folder') && <h2 className="text-lg font-semibold mb-2">Folders</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.filter(item => item.type === 'folder').map((item, index) => (
            <div
              key={`folder-${index}`}
              className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl"
              onClick={() => openFolder(item.name)}
            >
              <figure className="h-60 overflow-hidden">
                <img
                  src="/folder-icon.svg"
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        {currentItems.some(item => item.type !== 'folder') && <h2 className="text-lg font-semibold mb-2">Artworks</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.filter(item => item.type !== 'folder').map((item, index) => (
            <div
              key={`art-${index}`}
              className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl"
              onClick={() => setSelectedArt(item)}
            >
              <figure className="h-60 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title || item.name}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title || item.name}</h2>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
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

export default GalleryApp