import React, { useState, useEffect } from 'react';

function RandomNumberGenerator() {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const min = 4;
    const max = 5;
    const random = Math.random() * (max - min) + min;
    const roundedNumber = parseFloat(random.toFixed(1)); // Round to one decimal place
    setRandomNumber(roundedNumber);
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <div>
      <div style={{width:'70px',height:'30px',background:'green',borderRadius:'5px'}}  className='d-flex flex-row shadow-lg p-1 text-center'>
             {randomNumber && <p className='text-white'>{randomNumber}</p>}<i style={{fontSize:'20px'}} class=" ml-auto fa-regular fa-star text-white"></i>
      </div>
    </div>
  );
}

export default RandomNumberGenerator;
