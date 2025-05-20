import { Dropdown } from 'primereact/dropdown';
import { Galleria } from 'primereact/galleria';
import React, { useState, useEffect } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './gallery.css'

const PrimeGalleryApp = () => {
  const [images, setImages] = useState([]);
  const [theme, setTheme] = useState('saga-blue');

  useEffect(() => {
    fetch('/gallery/prime-gallery.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load JSON');
        return res.json();
      })
      .then((data) => {
        data.forEach(element => { element.thumbnailImageSrc = element.itemImageSrc; });
        setImages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const existing = document.getElementById('theme-css');
    if (existing) existing.remove();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'theme-css';
    link.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
    document.head.appendChild(link);
  }, [theme]);

  // const responsiveOptions = [
  //   { breakpoint: '1024px', numVisible: 5 },
  //   { breakpoint: '768px', numVisible: 3 },
  //   { breakpoint: '560px', numVisible: 1 }
  // ];

  const itemTemplate = (item) => {
    return (
      <button
        onClick={() => handleImageClick(item)}
        style={{ border: 'none', background: 'none', padding: 0 }}
        className="p-0 m-0"
        aria-label={item.alt}
      >
        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{ maxWidth: '100%', 
            maxHeight: '70vh', 
            height: 'auto', 
            objectFit: 'contain', 
            display: 'block', 
            margin: '0 auto',
            marginBottom: '3px' }}
        />
      </button>
    );
  };

  const thumbnailTemplate = (item) => (
    <img
      src={item.thumbnailImageSrc}
      alt={item.alt}
      style={{}}
    />
  );

  const handleImageClick = (item) => {
    alert(`Clicked: ${item.alt}`);
  };

  const themeOptions = [
    { label: 'Saga Blue', value: 'saga-blue' },
    { label: 'Vela Green', value: 'vela-green' },
    { label: 'Arya Orange', value: 'arya-orange' },
    { label: 'Luna Amber', value: 'luna-amber' },
  ];

  // return (
  //   <div className="card">
  //     <Galleria
  //       value={images}
  //       responsiveOptions={responsiveOptions}
  //       numVisible={5}
  //       style={{ maxWidth: '640px' }}
  //       item={itemTemplate}
  //       thumbnail={thumbnailTemplate}
  //     />
  //   </div>
  // );


  return (
    <div className="p-4">
      <div className="mb-4">
        <Dropdown value={theme} options={themeOptions} onChange={(e) => setTheme(e.value)} placeholder="Select Theme" />
      </div>
      <div className="card">
        <Galleria
          value={images}
          //responsiveOptions={responsiveOptions}
          numVisible={10}
          style={{
            margin: '0 auto',
            width: '1024px'
          }}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          showItemNavigators
          showThumbnails
        />
      </div>
    </div>
  );

};

export default PrimeGalleryApp;
