import React, { useState } from 'react';
import '../src/App.css'
import './Dsidebar.css'
import { useNavigate } from 'react-router-dom';


const DSidebar = ({ DisplySidebar, Value }) => {

  const navigate = useNavigate()
  const Email = localStorage.getItem('email') ? true : false
  const HandleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    localStorage.removeItem('CustamerName')
    localStorage.removeItem("mobile_number")
    localStorage.removeItem("password")
    navigate("/Home")
    window.location.reload()
  }




  return (
    <>


      <div className='col-12 card d-flex flex-column ' style={{ overflow: 'hidden',height:'100%',background:'' }}>

        <div className={`d-block d-md-block  d-flex flex-row justify-content-end mt-3 `}>
           <i  onClick={() => {  
            DisplySidebar()
          }} class={` ${Value ? 'd-block' : 'd-none'} fa-solid   fa-xmark p-1  text-danger`} style={{ fontSize: '25px',cursor:'pointer', borderRadius: '5px'}}></i>
        </div>
        <ul class="navbar-nav  mr-auto text-center ml-auto ">
          <li class="nav-item active  " style={{ visibility: 'hidden' }}>
            <a class="nav-link nav-linkss text-dark  btn " onClick={() => { navigate('/Product') }} >Products</a>
          </li>
          <li class="nav-item active   mt-">
            <a class="nav-link nav-linkss text-dark btn  " onClick={() => { navigate('/Home') }} >Home</a>
          </li>
          <li class="nav-item active mt-4">
            <a class="nav-link nav-linkss text-dark btn  " onClick={() => { navigate('/Product') }} >Products</a>
          </li>
          <li class="nav-item active mt-4">
            <a class="nav-link nav-linkss text-dark " onClick={() => { navigate('/Order') }}>Orders</a>
          </li>
          <ul className='navbar-nav '>
                    <li class="nav-item dropdown mt-5 mb-5 ml-auto mr-auto">
                     {Email?<>
                          <button className='btn nav-links text-dark' onClick={()=>{
                            HandleLogout()
                          }}>Logout</button>
                     </>:<><button className='btn nav-links text-dark ' onClick={()=>{
                        navigate('/Login')
                     }}>Login</button></>}
                  </li>
                        <li className="nav-item active mt-2 mb-2 ml-auto mr-auto" onClick={() => { navigate('/Addcard') }}>
                            <div className='d-flex flex-row mt-auto mb-auto '>
                                <a class="nav-link nav-linkss text-dark"><i class="fa-solid fa-cart-plus  mr-1" style={{ fontSize: '20px', cursor: 'pointer' }}></i> My Cart</a>
                            </div>
                        </li>
                    </ul>
        </ul>
      </div>


    </>
  )
}

export default DSidebar;
