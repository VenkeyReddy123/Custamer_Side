import React from 'react';
import Img1 from './Assets/img1.jpg';


import './Home.css';
import { useNavigate } from 'react-router-dom';

const Images = () => {
    const navigate=useNavigate()
    return (
        <>

            <div className="ml-3" style={{ position: 'relative', maxHeight: '300px', overflow: 'hidden', marginTop: '10px' }}>
                <img src={Img1} alt="" className="d-block shadow-lg col-10 mx-auto" style={{ maxWidth: '90%', height: 'auto', maxHeight: '300px' }} />
               
                   
            </div>

        </>
    );


}

export default Images;
