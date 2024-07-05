import React, { useState, useEffect } from 'react';

const handleImageChange = async (imageUrl, widthPercentage, heightPercentage) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const parentWidth = img.width;
      const parentHeight = img.height;
      
      const desiredWidth = (widthPercentage / 100) * parentWidth;
      const desiredHeight = (heightPercentage / 100) * parentHeight;
      
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedImageUrl = URL.createObjectURL(blob);
          resolve(resizedImageUrl);
        } else {
          reject(new Error('Failed to create blob object'));
        }
      }, 'image/jpeg', 100);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

const ResizedImage = ({ imageUrl, widthPercentage, heightPercentage }) => {
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  useEffect(() => {
    const fetchResizedImage = async () => {
      try {
        const resizedUrl = await handleImageChange(imageUrl, widthPercentage, heightPercentage);
        setResizedImageUrl(resizedUrl);
        console.log(resizedUrl);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    };

    fetchResizedImage();

    return () => {
      if (resizedImageUrl) {
        URL.revokeObjectURL(resizedImageUrl);
      }
    };
  }, [imageUrl, widthPercentage, heightPercentage]);

  return (
    <img className='mt-1 ml-auto mr-auto'    srcSet={resizedImageUrl} style={{ width: `${widthPercentage}%`, height: `${heightPercentage}%` }}  />
  );
};

export default ResizedImage;


// import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import ResponsiveImage from 'react-responsive-image';

// const EnhancedImage = ({ imageUrl, widthPercentage, heightPercentage }) => {
//   return (
//     <div style={{ width: `${widthPercentage}%`, height: `${heightPercentage}%` }}>
//       <ResponsiveImage>
//         <LazyLoadImage
//           src={imageUrl}
//           alt="Enhanced Image"
//           width={`${widthPercentage}%`}
//           height={`${heightPercentage}%`}
//           style={{ maxWidth: '100%', height: 'auto' }}
//         />
//       </ResponsiveImage>
//     </div>
//   );
// };

// export default EnhancedImage;
// import React from 'react';
// import ImageResizer from './ImageResizer';

// function App() {
//   return (
//     <div>
//       <ImageResizer 
//         src="path/to/your/image.jpg" 
//         widthPercent={50} 
//         heightPercent={50} 
//       />
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// function  ResizedImage({ src, widthPercent, heightPercent }) {
//   const [crop, setCrop] = useState({ aspect: widthPercent / heightPercent });
//   const [image, setImage] = useState(null);

//   const onImageLoaded = image => {
//     setImage(image);
//     const imageWidth = image.width;
//     const imageHeight = image.height;
//     const cropWidth = imageWidth * (widthPercent / 100);
//     const cropHeight = imageHeight * (heightPercent / 100);
//     setCrop({ aspect: cropWidth / cropHeight });
//   };

//   return (
//     <div>
//       <ReactCrop
//         src={src}
//         crop={crop}
//         onChange={newCrop => setCrop(newCrop)}
//         onImageLoaded={onImageLoaded}
//       />
//     </div>
//   );
// }

// export default  ResizedImage;
// import React from 'react';

// function ResizedImage({ imageUrl, widthPercent, heightPercent, alt }) {
//   return (
//     <div style={{ width: widthPercent, height: heightPercent }}>
//       <img src={imageUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
//     </div>
//   );
// }

// export default ResizedImage;


// import React, { useEffect } from 'react';
// import { Resizer } from 'react-image-file-resizer';

// const ResizedImage = ({ imageUrl, widthPercentage, heightPercentage }) => {

//   useEffect(() => {
//     const resizeImage = async () => {
//       try {
//         const resizedImage = await Resizer.imageFileResizer(
//           imageUrl,
//           widthPercentage,
//           heightPercentage,
//           'JPEG',
//           1000,
//           0,
//           'base64',
//           200,
//           200
//         );
//         console.log('Resized image:', resizedImage);
//         // Handle the resized image, for example, update state to reflect the resized image
//       } catch (error) {
//         console.error('Error resizing image:', error);
//       }
//     };

//     if (imageUrl) {
//       resizeImage();
//     }
//   }, [imageUrl, widthPercentage, heightPercentage]);

//   return (
//     <div>
    
//       <img src={imageUrl} width={`${widthPercentage}%`} height={`${heightPercentage}%`} alt="Resized" />
//     </div>
//   );
// };

// export default ResizedImage;







