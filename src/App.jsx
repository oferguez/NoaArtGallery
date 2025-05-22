import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/PhotoService';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './galleria-thumbbar.css';

const maxWidth = '60vw'
const maxHeight = '70vh'

// Artist details (can be moved to a separate file or component)
const artistDetails = (
  <div style={{ margin: "1.5rem 0", fontSize: "1.15rem", textAlign: "center", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
    <h2 style={{ marginBottom: "0.5rem" }}>Noa Guez</h2>
    <p>
      Noa Guez is a dedicated artist with a background in arts studies, a wealth of experience leading vibrant community arts projects, and a deep commitment to arts therapy. Her work blends creativity and compassion, inspiring individuals and communities alike.
    </p>
  </div>
);

export default function BasicDemo() {
  const [images, setImages] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const tooltipRef = useRef(null);

  const responsiveOptions = [
    { breakpoint: '1280px', numVisible: 8 },
    { breakpoint: '991px', numVisible: 4 },
    { breakpoint: '767px', numVisible: 3 },
    { breakpoint: '575px', numVisible: 1 },
  ];

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  // Selected Image View
  const itemTemplate = (item) => {
    if (!item) return null;
    return (
      <div
        style={{
          maxHeight: maxHeight, maxWidth: maxWidth,
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          margin: '1vh auto',
          cursor: 'pointer',
        }}
        onClick={() => { setSelectedImage(item); setShowDialog(true); }}
        title="Click to forward image to printing provider"
      >
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

  // Thumbnail Image View, with tooltip on hover
  const thumbnailTemplate = (item, index) => {
    // Unique id for tooltip target
    const thumbId = `thumb-${index}`;
    return (
      <>
        <img
          id={thumbId}
          src={item.thumbnailImageSrc}
          alt={item.alt}
          title={item.title}
          data-pr-tooltip={item.alt || item.title}
          style={{
            border: '2px solid yellow',
            margin: '2px',
            width: '90%',
            height: '100%',
            objectFit: 'contain',
            maxHeight: '13vh'
          }}
        />
        <Tooltip target={`#${thumbId}`} content={item.alt || item.title} />
      </>
    );
  };

  // Mock form for forwarding image
  const ForwardForm = ({ image, onHide }) => (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 300 }}>
      <h3>Forward to Printing Provider</h3>
      <div>
        <img src={image.itemImageSrc} alt={image.alt} style={{ maxWidth: 200, maxHeight: 120, border: "1px solid #ccc" }} />
      </div>
      <label>
        Select Print Size:
        <select style={{ marginLeft: 8 }}>
          <option>20x30 cm</option>
          <option>30x40 cm</option>
          <option>50x70 cm</option>
        </select>
      </label>
      <label>
        Quantity:
        <input type="number" min={1} defaultValue={1} style={{ marginLeft: 8, width: 60 }} />
      </label>
      <label>
        Your Email:
        <input type="email" required style={{ marginLeft: 8, width: 180 }} />
      </label>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button label="Submit" type="submit" />
        <Button label="Cancel" className="p-button-secondary" onClick={onHide} type="button" />
      </div>
    </form>
  );

  return (
    <div>
      {/* Top Logo and Artist Details */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
        <img src="/logo.jpeg" alt="Noa Guez Logo" style={{ width: 120, marginBottom: 10 }} />
        {artistDetails}
      </div>

      {/* Gallery Card */}
      <div className="card" style={{
        height: '100%',
        width: '100%',
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        margin: '1vh auto',
      }}>
        {images &&
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ height: '100%', width: '100%' }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            showThumbnails={true}
            showIndicators={false}
          />
        }
      </div>

      {/* Dialog for Forwarding Form */}
      <Dialog header="Forward Image to Print Provider" visible={showDialog} style={{ width: '30vw' }} modal onHide={() => setShowDialog(false)}>
        {selectedImage && <ForwardForm image={selectedImage} onHide={() => setShowDialog(false)} />}
      </Dialog>
    </div>
  );
}