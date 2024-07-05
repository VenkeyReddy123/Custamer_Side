import React, { useState, useRef, useEffect } from 'react';
import {Shop_by as Shop} from './Shop_by2'

function ProductDisplay({ Data2 }) {
  const containerRef = useRef(null);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
  const cardWidth = 220; // Width of each product card

  // Calculate number of visible products based on container width and card width
  const numVisibleProducts = Math.ceil(containerWidth / cardWidth);

  // Function to update visible products based on scroll position
  const updateVisibleProducts = () => {
    const startIndex = Math.floor(scrollPosition / cardWidth);
    setVisibleProducts(Data2.slice(startIndex, startIndex + numVisibleProducts));
  };

  // Handle scroll event
  const handleScroll = () => {
    setScrollPosition(containerRef.current.scrollLeft);
  };

  // Update visible products when scroll position changes
  useEffect(() => {
    updateVisibleProducts();
  }, [scrollPosition, Data2]);

  return (
    <div>
      <div className="product-container" ref={containerRef} onScroll={handleScroll}>
        {visibleProducts.map((product, index) => (
          <div className="product-card" key={index}>
            {product.name} - {product.price}
          </div>
        ))}
      </div>
      <button className="scroll-button" onClick={() => containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })}>Previous</button>
      <button className="scroll-button" onClick={() => containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })}>Next</button>
    </div>
  );
}

export default ProductDisplay;
