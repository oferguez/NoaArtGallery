import { Galleria } from 'primereact/galleria';
import React, { useState, useEffect } from 'react';

export default function PrimeGalleryApp() {
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 8
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

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

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />;
    };

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />;
    };

    return (
        <div className="card">
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '1000px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    );
}
        
