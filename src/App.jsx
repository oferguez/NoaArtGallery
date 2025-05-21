import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/PhotoService';

export default function BasicDemo() {
  const [images, setImages] = useState(null);
  const responsiveOptions = [
    {
      breakpoint: '1500px',
      numVisible: 8,
    },
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  const itemTemplate = (item) => {
    return (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img 
        src={item.thumbnailImageSrc} 
        alt={item.alt} 
        style={{ 
          border: '2px solid yellow',
          margin: '1px',
          width: '90%',
          height: '90%',
          objectFit: 'cover'
        }} 
      />
    );
  };

  return (
    <div className="card" style={{ height: '70vh', width: '70vw', margin: '5vh auto' }}>
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ height: '100%', width: '100%' }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showThumbnails={true}
        showIndicators
        containerStyle={{ height: '100%' }}
        containerClassName="custom-galleria"
      />
    </div>
  );
}