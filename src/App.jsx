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
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={item.itemImageSrc} 
          alt={item.alt} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%', 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            display: 'block',
          }} 
        />
      </div>
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
    <div className="card" style={{ height: '50vh', width: '50vw', margin: '1vh auto', border: '4px solid purple', }}>
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ height: '100%', width: '100%' }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showThumbnails={true}
        showIndicators={false}
        
        containerStyle={{ height: '100%' }}
        containerClassName="custom-galleria"
      />
    </div>
  );
}