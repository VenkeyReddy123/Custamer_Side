import React from 'react'
import img1 from './Assets/Fashio1.jpg'
import img2 from './Assets/Smart1.jpg'
import img3 from './Assets/mus1.jpg'
import { useNavigate } from 'react-router-dom'

const CardImages = () => {
   const navigate=useNavigate()
  return (
   <>
        <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row' style={{overflow:'hidden'}}>
                 <div className=' ml-auto mr-auto mt-2 col-sm-12 col-md-4 col-lg-4' style={{overflow:"hidden",position:'relative'}}>
                    <img src={img1} alt="" width={'100%'} height={'100%'} />
                    <h5 className='text-light' style={{position:'absolute',top:'20%',left:'10%'}}>Upto 70% Falte</h5>
                    <span className='text-white' style={{position:'absolute',top:'35%',left:'10%'}}>Festival Sesion Here</span>
                    <button style={{position:'absolute',top:'60%',left:'40px'}} className=' col-6 btn btn-warning' onClick={() => { navigate('/Product',{state:{Cat:'Cloth'}}) }}>Shop Now</button>
                    <span className='text-light' style={{position:'absolute',top:'85%',left:'40px'}}>No Emi | Exchange Offer</span>
                 </div>
                 <div className=' ml-auto mr-auto mt-2 col-sm-12 col-md-4 col-lg-4' style={{overflow:"hidden",position:'relative'}}>
                    <img src={img2} alt="" width={'100%'} height={'100%'} />
                    
                    <button style={{position:'absolute',top:'60%',left:'40px'}} className=' col-6 btn btn-light' onClick={() => { navigate('/Product',{state:{Cat:'Elec'}}) }}>Shop Now</button>
                    <span className='text-light' style={{position:'absolute',top:'85%',left:'40px'}}>No Emi | Exchange Offer</span>
                 </div>
                 <div className=' ml-auto mr-auto mt-2 col-sm-12 col-md-4 col-lg-4' style={{overflow:"hidden",position:'relative'}}>
                    <img className='' src={img3} alt="" width={'100%'} height={'100%'} />
                    <h5 className='text-white    ' style={{position:'absolute',top:'20%',left:'40px'}}>Deals On Play</h5>
                    <span className='text-light' style={{position:'absolute',top:'35%',left:'10%'}}>Festival Sesion Here</span>
                    <button style={{position:'absolute',top:'60%',left:'40px'}} className=' col-6 btn btn-dark'  onClick={() => { navigate('/Product',{state:{Cat:'Audio'}}) }}>Shop Now</button>
                    <span className='text-light' style={{position:'absolute',top:'85%',left:'40px'}}>No Emi | Exchange Offer</span>
                 </div>
        </div>
   </>
  )
}

export default CardImages