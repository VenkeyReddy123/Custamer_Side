import React, { useState } from 'react';

function ImageSlider({ images }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollStep = 120; // Adjust scroll step as needed

  const scrollImages = (direction) => {
    if (direction === 'left') {
      setScrollPosition((prevPosition) => Math.max(0, prevPosition - scrollStep));
    } else {
      setScrollPosition((prevPosition) => prevPosition + scrollStep);
    }
  };

  return (
    <div className="image-container" style={{ overflow: 'hidden' }}>
      <div className="images" style={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${scrollPosition}px)` }}>
        {images.map((e, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <button className="scroll-left" onClick={() => scrollImages('left')}>Previous</button>
      <button className="scroll-right" onClick={() => scrollImages('right')}>Next</button>
    </div>
  );
}

export default ImageSlider;

.image-container {
    display: flex;
    overflow: hidden;
  }
  
  .images {
    display: flex;
    transition: transform 0.3s ease;
  }
  
  img {
    width: 100px; /* Adjust image width as needed */
    height: auto; /* Maintain aspect ratio */
  }
  
  import React, { useState, useRef } from 'react';

function ShopComponent({ Shop }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollStep = 120; // Adjust scroll step as needed
  const shopItemsRef = useRef(null);

  const scrollImages = (direction) => {
    const containerWidth = shopItemsRef.current.clientWidth;
    const totalWidth = shopItemsRef.current.scrollWidth;

    if (direction === 'left') {
      setScrollPosition((prevPosition) => Math.max(0, prevPosition - scrollStep));
    } else {
      const maxScroll = Math.max(0, totalWidth - containerWidth);
      setScrollPosition((prevPosition) => Math.min(maxScroll, prevPosition + scrollStep));
    }
  };

  return (
    <div className="shop-container" style={{ position: 'absolute', top: '60px', overflowX: 'auto', scrollbarWidth: 'none' }}>
      <div ref={shopItemsRef} className="shop-items" style={{ display: 'flex', transition: 'transform 0.3s ease', transform: `translateX(-${scrollPosition}px)` }}>
        {Shop && Shop.map((e, index) => (
          <div key={index} style={{ height: '150px', border: '3px solid #F7F7F7', overflow: 'hidden', borderRadius: '30%' }} className='col-7 col-md-4 col-lg-2 text-center bg-white ml-5'>
            <div onClick={() => {
              navigate("/Product", { state: { Cat: e.Name.slice(0, 5) } })
            }} style={{ height: '120px', borderRadius: '30%', cursor: 'pointer' }} className='p-3 text-center'>
              <img className='' src={e.Img} alt="" srcSet="" style={{ height: '100px', borderRadius: '30%', width: '110px' }} /><br />
              <small><small style={{ fontWeight: 'bolder' }}>{e.Name}</small></small>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-left" onClick={() => scrollImages('left')}>Previous</button>
      <button className="scroll-right" onClick={() => scrollImages('right')}>Next</button>
    </div>
  );
}

export default ShopComponent;
