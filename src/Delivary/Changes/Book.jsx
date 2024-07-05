import React from 'react'
import {  useNavigate } from 'react-router-dom'

export default function Book() { 
    const navigate=useNavigate()
    return (
        <>
            <div className='container mt-2 bg-primary  d-flex flex-column ' style={{ height: "400px" }}>
                <div className='text-center mr-auto ml-auto '>
                    <div className='bg-success mt-5 ' style={{ width: '100px', height: '100px', borderRadius: '50px' }} >
                        <i class="fa-solid fa-check text-light mt-4" style={{ fontSize: '50px' }}></i>
                        
                    </div>
                      
                </div>
                <span className='text-light  mr-auto ml-auto mt-3  '>Booking Conformed</span>
                <button className='btn btn-dark col-sm-2 col-lg-2 mr-auto ml-auto mt-3 shadow-lg' style={{maxHeight:'50px'}}>Check Status</button>

                <span>Delivary Adress Is</span>
                <div className='d-flex flex-column flex-wrap' style={{ overflowX: 'hidden' }}>
                    <span style={{ fontWeight: 'bold' }} className='text-light'>D-30,parvathonagr,medelli,ganesh  templeparvathinager,medahalli,Bengalore,<br></br>Bengaluru Devision 560049</span>
                </div>
            </div>
            <div>
                 <div className=' container card-footer'>
                       <button onClick={()=>{navigate('/Home')}} >Home Page</button>
                 </div>
                 <div className='container card-footer'>
                       <button onClick={()=>{navigate('/Orders')}} >Your Orders</button>
                 </div>
            </div>


        </>
    )
}
