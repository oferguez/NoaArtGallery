/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
const BASE_FOLDER = '/gallery';
const GALLERY_JSON_URL = '/gallery/gallery.json';

function GalleryApp() {

  const [artworks, setArtworks] = useState([]);
  const [currentPath, setCurrentPath] = useState(BASE_FOLDER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArt, setSelectedArt] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    fetch(GALLERY_JSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load gallery.');
        return res.json();
      })
      .then(setArtworks)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  //const folders = [...new Set(artworks.map(item => item.path?.split('/')[0]).filter(p => p && p !== currentPath))];

  artworks.map(o => {
    if (o.type === 'art') {
      console.log(`ART item: ${o.url} , l: ${o.url?.split('/').length}`);
    } else {
      console.log(`FOLDER item: ${o.path} , l: ${o.path?.split('/').length}`);
    }
  }
  );

  const currentItems = artworks.filter(item => {
    const path = item.path || item.url || '';
    return path.startsWith(currentPath)
      && path.split('/').length === (currentPath ? currentPath.split('/').length + 1 : 1);
  }).sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    const nameA = (a.title || a.name || '').toLowerCase();
    const nameB = (b.title || b.name || '').toLowerCase();
    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const openFolder = (folder) => {
    setCurrentPath(prev => prev ? `${prev}/${folder}` : folder);
  };

  const goUp = () => {
    if (!currentPath) return;
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/'));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <div className="text-center p-10">Loading gallery...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error.message}</div>;

  const baseFolder = currentPath === BASE_FOLDER;

  return (
    <div data-theme="night" className="min-h-screen bg-base-200 text-base-content">
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <span className="text-xl font-bold px-8">Art Gallery{baseFolder ? '' : ': '} {currentPath.slice(9)}</span>
          <div className="flex items-center gap-4">
            {!baseFolder && <button
              className="btn btn-lg font-bold text-lg transition-transform duration-200 hover:scale-110 hover:bg-blue-200 hover:text-black hover:shadow-xl"
              onClick={goUp}
            >
              Parent Folder
              <img src="FolderUp.png" alt="Go Up" className="h-3/4 w-auto ml-2" />
            </button>}
            <button className="btn btn-lg drop-shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-blue-200 hover:text-black hover:shadow-xl" onClick={toggleSortOrder}>
              Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
        </div>
      </div>

      {/* Logo and Welcome Landing Text */}
      {baseFolder && (
        <div className="flex flex-col items-center py-8">
          <img src="/logo.jpeg" alt="Logo" className="w-40 h-40 object-contain shadow-lg mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome to Noa's Art Gallery!</h1>
          <p className="text-lg text-gray-600">Explore artworks and curated collections.</p>
        </div>
      )}

      <div className="p-4">
        {currentItems.some(item => item.type !== 'folder') && (
          <div className="flex justify-center items-center w-full mb-2">
            <h3 className="text-3xl font-bold text-center w-full border-2 border-primary pb-2 mb-8">Artworks</h3>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.filter(item => item.type !== 'folder').map((item, index) => (
            <div
              key={`art-${index}`}
              className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl flex flex-col items-center p-2"
              onClick={() => setSelectedArt(item)}
              onKeyDown={() => setSelectedArt(item)}
            >
              <div className="w-96 h-96 flex items-center justify-center overflow-hidden rounded-md bg-base-200">
                <img
                  src={item.url}
                  alt={item.title || item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full mt-2 flex flex-col items-center justify-center">
                <h2 className="card-title text-base font-semibold text-center">{item.title || item.name}</h2>
                {item.description && <p className="text-sm text-gray-500 text-center">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        {currentItems.some(item => item.type === 'folder') && (
        <div className="flex justify-center items-center w-full mb-2">
          <h3 className="text-3xl font-bold text-center w-full border-2 border-primary pb-2 mb-8">Folders</h3>
        </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.filter(item => item.type === 'folder').map((item, index) => (
            <div
              key={`folder-${index}`}
              className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl flex flex-col items-center p-2"
              onClick={() => openFolder(item.name)}
              onKeyDown={() => openFolder(item.name)}
            >
              <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-md bg-base-200">
                <img
                  src={'/folder-icon-2.svg'}
                  alt={item.name}
                  className="object-contain w-16 h-16"
                />
              </div>
              <div className="w-full mt-2 flex flex-col items-center justify-center">
                <h2 className="card-title text-base font-semibold text-center">{item.name}</h2>
                {item.description && <p className="text-sm text-gray-500 text-center">{item.description}</p>}
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
  );
}

export default GalleryApp;