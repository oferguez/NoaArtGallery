import { useEffect, useState } from 'react';

import Artwork from './components/Artwork';

const BASE_FOLDER = '/gallery';
const GALLERY_JSON_URL = '/gallery/gallery.json';

function GalleryApp() {

  const [artworks, setArtworks] = useState([]);
  const [currentPath, setCurrentPath] = useState(BASE_FOLDER);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArt, setSelectedArt] = useState(null);
  const [collectionHierarchy, setCollectionHierarchy] = useState({});

  const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'];

  useEffect(() => {
    fetch(GALLERY_JSON_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load gallery.');
        return res.json();
      })
      .then(data => {
        setArtworks(data);
        const hierarchy = {};
        data.filter(item=>item.type==='folder').forEach(item => {
          const parts = (item.path||item.url).split('/');
          let current = hierarchy;
          parts.forEach(part => {
            if (!current[part]) current[part] = {};
            current = current[part];
          });
        });
        setCollectionHierarchy(hierarchy);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const currentArtworks = artworks.filter(item => item.type === 'art' && item.url.startsWith(currentPath) && item.url.split('/').length === (currentPath.split('/').length + 1));

  const openFolder = (folder) => {
    setCurrentPath(prev => prev ? `${prev}/${folder}` : folder);
  };

  const goUp = () => {
    if (!currentPath) return;
    const parts = currentPath.split('/');
    parts.pop();
    setCurrentPath(parts.join('/'));
  };

  const changeTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  const renderTree = (node, path = '') => {
    if (!node) return null;
    return (
      <ul>
        {Object.keys(node).map((key) => (
          <li key={key}>
            <button className="btn btn-sm" onClick={() => setCurrentPath(`${path}/${key}`)}>{key}</button>
            {renderTree(node[key], `${path}/${key}`)}
          </li>
        ))}
      </ul>
    );
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

            {/* {!baseFolder && <button
              className="btn btn-lg font-bold text-lg transition-transform duration-200 hover:scale-110 hover:bg-blue-200 hover:text-black hover:shadow-xl"
              onClick={goUp}
            >
              Parent Collection
              <img src="FolderUp.png" alt="Go Up" className="h-3/4 w-auto ml-2" />
            </button>} */}

            <div id="themePicker" className="dropdown dropdown-hover">
              <label htmlFor="themePicker" className="btn btn-lg">Select Theme</label>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {themes.map((theme) => (
                  <li key={theme}>
                    <button onClick={() => changeTheme(theme)}>{theme}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div id="collectionSelector" className="dropdown dropdown-hover">
              <label htmlFor="collectionSelector" className="btn btn-lg">Select Collection</label>
              <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {renderTree(collectionHierarchy)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {baseFolder && (
        <div className="flex flex-col items-center py-8">
          <img src="/logo.jpeg" alt="Logo" className="w-40 h-40 object-contain shadow-lg mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome to Noa&apos;s Art Gallery!</h1>
          <p className="text-lg text-gray-600">Explore artworks and curated collections.</p>
        </div>
      )}

      <div className="p-4">

        {/* {currentArtworks.length > 0 && (
          <div className="flex justify-center items-center w-full mb-2">
            <h3 className="text-3xl font-bold text-center w-full border-2 border-primary pb-2 mb-8">Artworks</h3>
          </div>
        )} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentArtworks.map((item, index) => (
            <Artwork key={`art-${index}`} item={item} onClick={() => setSelectedArt(item)} />
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