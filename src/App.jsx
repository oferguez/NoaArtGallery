import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/PhotoService';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './galleria-thumbbar.css';

// Artist details
const ARTIST_NAME = "Noa Guez";
const LOGO_SRC = "/logo.jpeg";
const ARTIST_PARAGRAPH = (
  <span style={{ fontSize: "1.05rem" }}>
    Noa Guez is a dedicated artist with a background in arts studies, a wealth of experience leading vibrant community arts projects, and a deep commitment to arts therapy. Her work blends creativity and compassion, inspiring individuals and communities alike.
  </span>
);

export default function BasicDemo() {
  const [images, setImages] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  // Main image view
  const itemTemplate = (item) => {
    if (!item) return null;
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '60vh',
          maxWidth: '70vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          background: "#fff",
        }}
        onClick={() => { setSelectedImage(item); setShowDialog(true); }}
        title="Click to forward image to printing provider"
      >
        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{
            maxHeight: '60vh',
            maxWidth: '70vw',
            objectFit: "contain",
            display: "flex"
          }}
        />
      </div>
    );
  };

  // Thumbnail template with tooltip
  const thumbnailTemplate = (item, index) => {
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
            objectFit: 'contain',
            maxHeight: 70,
            maxWidth: 120,
            width: "auto",
            height: "auto",
            display: "block"
          }}
        />
        <Tooltip target={`#${thumbId}`} content={item.alt || item.title} />
      </>
    );
  };

  // Mock forwarding form
  const ForwardForm = ({ image, onHide }) => (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 200 }}>
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
    <div
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#fafafa"
      }}
    >
      {/* Top Section */}
      <div
        style={{
          height: "10vh",
          minHeight: 90,
          maxHeight: 160,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "rgba(255,255,255,0.98)",
          textAlign: "center",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 32, color: "#475569" }}>{ARTIST_NAME}</span>
        <img
          src={LOGO_SRC}
          alt="Noa Guez Logo"
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #bdbdbd",
            margin: "0 18px",
            boxShadow: "0 2px 6px #0002"
          }}
        />
        <span style={{ maxWidth: 400, minWidth: 180 }}>{ARTIST_PARAGRAPH}</span>
      </div>

      {/* Gallery */}
      <div
        className="card"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {images &&
          <Galleria
            value={images}
            numVisible={5}
            style={{
              maxHeight: "60vh",
              maxWidth: "80vw",
              margin: "0 auto"
            }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            showThumbnails={true}
            showIndicators={false}
          />
        }
      </div>

      {/* Dialog for Forwarding Form */}
      <Dialog header="Forward Image to Print Provider" visible={showDialog} style={{ width: '92vw', maxWidth: 400 }} modal onHide={() => setShowDialog(false)}>
        {selectedImage && <ForwardForm image={selectedImage} onHide={() => setShowDialog(false)} />}
      </Dialog>
    </div>
  );
}