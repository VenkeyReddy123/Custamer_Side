import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import axios from 'axios'

const Navbar = ({ Callback, DisplySidebar }) => {
    const [Al,SetAl]=useState(0)
   useEffect(()=>{
    axios.get("http://127.0.0.1:8000/AddCardDetails/")
    .then((d) => {

   const Flen= d.data.filter((e)=>{
       if(e.Custamer_Name.Email== localStorage.getItem('email')){
          return e 
       }
    })
    SetAl(Flen.length)
     
    })
   },[])
    const navigate = useNavigate()
    const Email = localStorage.getItem('email') ? true : false
    const HandleLogout = () => {
        localStorage.setItem('Count',10)
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        localStorage.removeItem('CustamerName')
        localStorage.removeItem("mobile_number")
        localStorage.removeItem("password")
        navigate("/Home")
        window.location.reload()
       
    }
    const handleClick = () => {
        Callback()
    }
    const ButtonClick = () => {
        DisplySidebar()
    }
    const handleMouseEnter = event => {
        event.target.style.color = 'yellow'; // Change color on hover
    };
    return (
        <>
            <nav class="navbar navbar-expand-lg ml-auto  col-12" style={{ height: '50px',overflow:'hidden', }} >
                <div className='d-flex flex-row mt-auto mb-auto col-2   ' onClick={handleClick}>
                    <div className=' ' style={{ cursor: 'pointer' }} >
                        <div className='' style={{ background: 'lightblue' }}>
                            <i className="fa-solid fa-list p-2" style={{ fontSize: '20px' }} ></i>
                        </div>
                    </div>
                    <div className=' d-flex flex-column ml-3   mt-auto mb-auto  ' style={{ cursor: 'pointer' }} >
                        <span className=' mt-auto mb-auto text-warning' style={{ fontSize: '15px', }}>Shop By</span>
                        <h6 className='mt-auto mb-auto' style={{ color: 'yellow', fontSize: '15px' }}>Categories</h6>
                    </div>
                    <div className=' ml-3 ' style={{ borderRight: '1px solid #2356A7' }} >

                    </div>
                </div>
                <button class="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" onClick={ButtonClick}></span>
                </button>


                <div class="collapse navbar-collapse d-none d-lg-block   " id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item active mb-auto ml-3 mr-3">

                            <a class="nav-link text-white Hover " style={{}} onClick={() => { navigate('/Home') }}>Home</a>
                        </li>
                        <li class="nav-item active  ml-3 mr-3  mb-auto">
                            <a class="nav-link text-white Hover " onClick={() => { navigate('/Product') }} >Products</a>
                        </li>

                        <li class="nav-item activm   ml-3 mr-3">
                            <a class="nav-link text-white Hover" onClick={() => { navigate('/Order') }}>Orders</a>
                        </li>


                    </ul>
                   <div className=' ml-auto ' style={{ borderLeft: '1px solid #white' }} >

                    </div>
                    <ul className='navbar-nav '>
                    <li class="nav-item dropdown mt-5 mb-5 ml-auto mr-auto">
                     {Email?<>
                          <button className='btn text-white Hover' onClick={()=>{
                            HandleLogout()
                          }}>Logout</button>
                     </>:<><button className='btn text-white Hover' onClick={()=>{
                        navigate('/Login')
                     }}>Login</button></>}
                  </li>
                        <li class="nav-item active mt-auto mb-auto ml-5" onClick={() => { navigate('/Addcard') }}>
                            <div className='d-flex flex-row mt-auto mb-auto '>
                                <a class="nav-link text-white "  ><i class="fa-solid fa-cart-plus" style={{ fontSize: '20px', cursor: 'pointer' }}></i></a><span className='text-white mt-1 Hover'>My Cart</span>
                               <div className='rounded-circle bg-secondary card d-flex flex-row justify-content-center' style={{position:'absolute',width:'20px',top:'25px',right:'80px'}}>
                                  <small className='text-white' style={{fontSize:'10px'}} >{Al}</small>
                               </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </nav>

        </>
    )
}

export default Navbar
