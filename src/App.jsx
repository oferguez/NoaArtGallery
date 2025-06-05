/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { Tooltip } from 'primereact/tooltip';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import { PhotoService } from './service/PhotoService';

import './galleria-thumbbar.css';

// Artist details
const ARTIST_NAME = 'Noa Guez';
const LOGO_SRC = '/logo.jpeg';
const ARTIST_PARAGRAPH_EN =
  'Noa Guez is a dedicated artist with a background in arts studies, ' +
  'a wealth of experience leading vibrant community arts projects, ' +
  'and a deep commitment to arts therapy. ' +
  'Her work blends creativity and compassion, inspiring individuals and communities alike.';
const ARTIST_PARAGRAPH_HE =
  'נועה גז היא אמנית מסורה עם רקע בלימודי אמנות, ניסיון עשיר בהובלת פרויקטים קהילתיים תוססים, ומחויבות עמוקה לטיפול באמצעות אמנויות. יצירתה משלבת יצירתיות וחמלה, ומעוררת השראה ביחידים ובקהילות כאחד.';


export default function BasicDemo() {

  const [images, setImages] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const thumbnailBarRef = useRef(null);

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  // Helper: detect desktop
  const isDesktop = window.innerWidth > 900;

  // Calculate how many thumbnails fit in 70vw with 8px gap
  const THUMB_WIDTH = isDesktop ? 120 : 80; // px
  const GAP = 8; // px
  const MAX_WIDTH = 0.7 * window.innerWidth; // 70vw in px
  const maxThumbnails = Math.max(1, Math.floor((MAX_WIDTH + GAP) / (THUMB_WIDTH + GAP)));

  const currentIdx = (images && images.length > 0) ?
    images.findIndex(img => img.itemImageSrc === selectedImage?.itemImageSrc) :
    0;

  // Track the first visible thumbnail index for scrolling
  const [thumbStart, setThumbStart] = useState(0);

  // When selectedImage changes, scroll thumbnails to keep it in view
  useEffect(() => {
    if (!images || images.length === 0) return;
    if (!selectedImage) {
      console.log(`setSelectedImage(images[0]):`);
      setSelectedImage(images[0]);
      return; //todo: is this legit???
    }
    const idx = images.findIndex(img => img.itemImageSrc === selectedImage.itemImageSrc);
    if (idx < thumbStart) {
      setThumbStart(idx);
    } else if (idx >= thumbStart + maxThumbnails) {
      setThumbStart(idx - maxThumbnails + 1);
    }
    // Scroll the thumbnail bar to the selected thumbnail (for smooth UX)
    if (thumbnailBarRef.current) {
      const thumb = thumbnailBarRef.current.querySelector(`#thumb-${idx}`);
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedImage, images, thumbStart, maxThumbnails]);

  const handleLeft = () => {
    setThumbStart(() => {
      const idx = images.findIndex(img => img.itemImageSrc === selectedImage?.itemImageSrc);
      if (idx === 0) {
        console.warn(`handleLeft: end of thumbnail!!! pic ${idx}`);
        return;
      }

      setSelectedImage(() => images[idx - 1]);
      return (idx === thumbStart) ? thumbStart - 1 : thumbStart;
    });
  };


  const handleRight = () => {
    setThumbStart(() => {
      const idx = images.findIndex(img => img.itemImageSrc === selectedImage?.itemImageSrc);
      if (idx === images.length - 1) {
        console.warn(`handleRight end of thumbnail!!! pic ${idx}`);
        return;
      }

      setSelectedImage(() => images[idx + 1]);
      const end = thumbStart + maxThumbnails - 1;
      return (idx === end) ? thumbStart + 1 : thumbStart;
    });
  };

  // Main image view
  const itemTemplate = () => {
    const item = selectedImage;
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
          textOverflow: 'ellipsis',
          cursor: 'pointer',
          background: '#fff',
          marginBottom: '1vh'
        }}
        onClick={() => { setShowDialog(true); }}
        onKeyDown={() => { setShowDialog(true); }}
        title="Click to forward image to printing provider"
        role="button"
        tabIndex="0"
      >
        <img
          src={item.itemImageSrc}
          alt={item.alt}
          style={{
            maxHeight: '60vh',
            maxWidth: '70vw',
            objectFit: 'contain',
            display: 'flex'
          }}
        />
      </div>
    );
  };

  // Thumbnail template (with accessibility fix)
  const thumbnailTemplate = (item, index) => {
    const thumbId = `thumb-${index}`;
    const isSelected = selectedImage && item.itemImageSrc === selectedImage.itemImageSrc;
    return (
      <React.Fragment key={thumbId}>
        <button
          type="button"
          id={thumbId}
          className="p-galleria-thumbnail-item"
          style={{
            padding: 0,
            background: isSelected ? '#f3e5f5' : 'none',
            margin: '2px',
            objectFit: 'contain',
            maxWidth: 120,
            width: 120,
            height: 'auto',
            display: 'block',
            cursor: 'pointer',
            // outline: isSelected ? '2px solid #8e24aa' : 'none',
          }}
          tabIndex={0}
          onClick={() => setSelectedImage(item)}
          aria-label={item.alt || item.title}
        >
          <img
            src={item.thumbnailImageSrc}
            alt={item.alt}
            className="p-galleria-thumbnail-image"
            style={{
              background: isSelected ? '2px solid #8e24aa' : '2px solid yellow',
              width: '100%',
              height: '100%',
              maxHeight: '10vh',
              objectFit: 'contain'
            }}
          />
        </button>
        <Tooltip target={`#${thumbId}`} content={item.alt || item.title} />
      </React.Fragment>
    );
  };

  // Mock forwarding form

  const ForwardForm = ({ image, onHide }) => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 200 }}>
      <h3>Forward to Printing Provider</h3>
      <div>
        <img src={image.itemImageSrc} alt={image.alt} style={{ maxWidth: 200, maxHeight: 120, border: '1px solid #ccc' }} />
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
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button label="Submit" type="submit" />
        <Button label="Cancel" className="p-button-secondary" onClick={onHide} type="button" />
      </div>
    </form>
  );

  ForwardForm.propTypes = {
    image: PropTypes.shape({
      itemImageSrc: PropTypes.string,
      alt: PropTypes.string,
      thumbnailImageSrc: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#fafafa'
      }}
    >
      {/* Top Section */}
      <div
        style={{
          height: '10vh',
          minHeight: 90,
          maxHeight: '10vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: 'rgba(255,255,255,0.98)',
          textAlign: 'center',
          margin: '1vh',
          overflow: 'hidden',
        }}
      >

        <span style={{
          maxWidth: 200,
          minWidth: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1.05rem',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal',
          textAlign: 'right',
          direction: 'rtl'
        }}
          title={ARTIST_PARAGRAPH_HE}
        >{ARTIST_PARAGRAPH_HE}</span>


        <span
          style={{ fontWeight: 700, fontSize: 32, color: '#475569' }}>
          {ARTIST_NAME}
        </span>

        <img
          src={LOGO_SRC}
          alt="Noa Guez Logo"
          style={{
            width: 70,
            height: 70,
            objectFit: 'cover',
            margin: '0 18px',
          }}
        />
        <span style={{
          maxWidth: 200,
          minWidth: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1.05rem',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal',
          textAlign: 'left'
        }}
          title={ARTIST_PARAGRAPH_EN}
        >{ARTIST_PARAGRAPH_EN}</span>
      </div>

      {/* Main Image Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          background: '#fff',
          // border: '6px solid #8e24aa', // KEEP for debugging
          borderBottom: 'none',
          boxSizing: 'border-box',
        }}
      >
        {images &&
          <Galleria
            value={images}
            numVisible={5}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '100%',
              maxWidth: '95vw',
              margin: '0 auto',
              background: 'transparent',
            }}
            item={itemTemplate}
            thumbnail={null}
            showThumbnails={false}
            showIndicators={false}
          />
        }
      </div>

      {/* Thumbnail Bar Fixed at Bottom */}
      <div
        ref={thumbnailBarRef}
        style={{
          width: '100%',
          minHeight: '7vh',
          maxHeight: '15vh',
          background: '#222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: GAP,
          padding: 8,
          // borderTop: '6px solid #8e24aa', // KEEP for debugging
          boxSizing: 'border-box',
          marginBottom: '1vh',
          overflowX: 'auto',
        }}
      >

        <button
          type="button"
          disabled={currentIdx === 0}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 28,
            cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIdx === 0 ? 0.5 : 1,
            marginRight: 8,
            padding: '0 8px',
            height: 48,
          }}
          onClick={handleLeft}
          aria-label="Scroll thumbnails left"
        >
          {'<'}
        </button>


        {images &&
          images
            .slice(thumbStart, thumbStart + maxThumbnails)
            .map((img, idx) => thumbnailTemplate(img, thumbStart + idx))}

        {images &&
          <button
            type="button"
            disabled={currentIdx === images.length - 1}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              marginLeft: 8,
              padding: '0 8px',
              height: 48,
              opacity: currentIdx === images.length - 1 ? 0.5 : 1,
              cursor: currentIdx === images.length - 1 ? 'not-allowed' : 'pointer',
            }}
            onClick={handleRight}
            aria-label="Scroll thumbnails right"
          >
            {'>'}
          </button>
        }
      </div>

      {/* Dialog for Forwarding Form */}
      <Dialog header="Forward Image to Print Provider" visible={showDialog} style={{ width: '92vw', maxWidth: 400 }} modal onHide={() => setShowDialog(false)}>
        {selectedImage && <ForwardForm image={selectedImage} onHide={() => setShowDialog(false)} />}
      </Dialog>
    </div>
  );
}

/*
todo: refactoring

  - currentIdx calculate once
  - arrow right and left on the keyboard to scrill thumbnail
  - thumbnail Height in one variable
  - break to components 
  - decide on one location for style. currently in main function, in template and some in css
  - handle eslint expectionw
  - automation tests on PR
  - content management tool
  */