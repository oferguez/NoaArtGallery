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
      <div style={{
        maxHeight: '50vh', maxWidth: '50vw',
        width: '100%', height: '100%', display: 'flex', alignItems: 'left', justifyContent: 'left', overflow: 'hidden',
        border: '5px dashed green',

      }}>
        PARENT  AND MORE   

        {/* <div
          style={{
            // width: '200px',
            height: '400px',

            width: '100%',
            maxWidth: '200px',       // maximum width
            maxHeight: '300px',
            aspectRatio: '1 / 1',    // 200 / 400 = 1:2 aspect ratio

            border: '2px solid blue',
            backgroundColor: 'cyan',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        > 200X400</div> */}

        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'flex',
            boxSizing: 'border-box',
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
          margin: '2px',
          width: '90%',
          height: '90%',
          objectFit1: 'cover'
        }}
      />
    );
  };

  return (
    <div className="card" style={{
      height: '100%',
      width: '100%',
      maxHeight: '50vh',
      maxWidth: '50vw',
      margin: '1vh auto',
      border: '4px solid purple'
    }}>
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{
          height: '20%',
          width: '100%',
          maxHeight_1: '40vh',
          maxWidth_1: '40vw'
        }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showThumbnails={true}
        showIndicators={false}

      />
    </div>
  );
}