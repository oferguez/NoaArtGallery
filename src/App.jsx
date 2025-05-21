import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/PhotoService';
import './galleria-thumbbar.css';


const maxWidth = '60vw'
const maxHeight = '70vh'

export default function BasicDemo() {
  const [images, setImages] = useState(null);
  const responsiveOptions = [
    {
      breakpoint: '1280px',
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

  // Selected Image View 
  const itemTemplate = (item) => {
    return (
      <div style={{
        maxHeight: maxHeight, maxWidth: maxWidth, // had to repeat abolsut size as used by the wrapping card, so image will be resized propery
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        margin: '1vh auto'
        // border: '5px dashed green'
        }}>

        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            objectFit: 'contain',
            display: 'flex'
          }}
        />
      </div>
    );
  };

  // Thumbnail Image View
  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{
          border: '2px solid yellow',
          margin: '2px',
          width: '90%',
          height: '100%',
          objectFit: 'contain',
          maxHeight: '13vh'  // must be aligned with max thumbnail height in galleria-thumbbar.css
        }}
      />
    );
  };

  return (
    <div className="card" style={{
      height: '100%',
      width: '100%',
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      margin: '1vh auto',
      // border: '4px solid purple'
    }}>
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{
          height: '100%',
          width: '100%',
        }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showThumbnails={true}
        showIndicators={false}

      />
    </div>
  );
}