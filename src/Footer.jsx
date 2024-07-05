import React, { useState } from 'react'

function Footer() {
    const [Hel, Sethel] = useState(false)
    const [Pol, Setpol] = useState(false)
    const [Abo, SetAbo] = useState(false)
    const [Con, SetCon] = useState(false)
    return (
        <>
            <div className='container-fluid p-2 mb-3  d-none d-lg-block d-lg-flex flex-lg-row justify-content-around' style={{ overflowX: 'hidden', background: '#1F4C94' }}>
                <div className=' col-lg-2  text-white d-flex flex-column'>
                    <h6 className='text-warning'>Help</h6>
                    <span className='mt-3'>Payments</span>
                    <span className='mt-3'>Shipping</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>FAQ</span>
                    <span className='mt-3'>Report Infringement</span>

                </div>
                <div className=' col-lg-2  text-white d-flex flex-column'>
                    <h6 className='text-warning'>Plocy</h6>
                    <span className='mt-3'>Terms Of Use</span>
                    <span className='mt-3'>Security</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>Privacy</span>
                    <span className='mt-3'>Sitemap</span>
                </div>
                <div className=' col-lg-2  text-white d-flex flex-column'>
                    <h6 className='text-warning'>About</h6>
                    <span className='mt-3'>Contact Us</span>
                    <span className='mt-3'>About Us</span>
                    <span className='mt-3'>Careers</span>
                    <span className='mt-3'>Flipkart Stories</span>
                    <span className='mt-3'>Press</span>


                </div>

                <div className='col-lg-3  d-flex flex-column text-white'>
                    <h6 className='text-warning'>Contact US</h6>
                    <span className='mt-3'> <i class="fa-solid fa-location-dot ml-3"></i>    Ardente Office One Block-1, First floor Unit No - F-1115 Sadarmangala road, Hoodi, Circle, Whitefield, Bengaluru, Karnataka 560048</span>
                    <span className='mt-3'><i class="fa-solid fa-phone-volume mr-2"></i>  (+91) 08042072181</span>
                    <span className='mt-3'><i class="fa-regular fa-envelope mr-2"></i>support@cloudsoftwaresolution.con</span>


                </div>
            </div>
            <div className='d-block d-lg-none d-flex flex-column mb-2 p-3' style={{ background: '#1F4C94' }}>
                <div className='col-12 d-flex flex-column'>
                    <div className='col-12 d-flex flex-row justify-content-between'>
                        <h6 className='text-warning'>Help</h6>
                        {Hel ? <><span><i class="fa-solid fa-angle-up text-success" style={{cursor:'pointer'}} onClick={()=>{Sethel(false)}}></i></span></> : <><span><i style={{cursor:'pointer'}} class="fa-solid fa-angle-down text-success" onClick={()=>{Sethel(true)}}></i></span></>}
                    </div>
                    {Hel&&<>
                    <div className='col-12 d-flex flex-column text-light mb-2'>
                    <span className='mt-3'>Payments</span>
                    <span className='mt-3'>Shipping</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>FAQ</span>
                    <span className='mt-3'>Report Infringement</span>
                    </div>
                    </>}
                </div>
                <div className='col-12 d-flex flex-column'>
                    <div className='col-12 d-flex flex-row justify-content-between'>
                    <h6 className='text-warning'>Plocy</h6>
                        {Pol ? <><span><i class="fa-solid fa-angle-up text-success" style={{cursor:'pointer'}}  onClick={()=>{Setpol(false)}}></i></span></> : <><span><i style={{cursor:'pointer'}} class="fa-solid fa-angle-down text-success" onClick={()=>{Setpol(true)}}></i></span></>}
                    </div>
                    {Pol&&<>
                    <div className='col-12 d-flex flex-column text-light mb-2'>
                    <span className='mt-3'>Terms Of Use</span>
                    <span className='mt-3'>Security</span>
                    <span className='mt-3'>Cancellation</span>
                    <span className='mt-3'>Privacy</span>
                    <span className='mt-3'>Sitemap</span>
                    </div>
                    </>}
                </div>
                <div className='col-12 d-flex flex-column'>
                    <div className='col-12 d-flex flex-row justify-content-between'>
                    <h6 className='text-warning'>About</h6>
                        {Abo ? <><span><i class="fa-solid fa-angle-up text-success" onClick={()=>{SetAbo(false)}}></i></span></> : <><span><i onClick={()=>{SetAbo(true)}} style={{cursor:'pointer'}} class="fa-solid fa-angle-down text-success"></i></span></>}
                    </div>
                    {Abo&&<>
                    <div className='col-12 d-flex flex-column text-light mb-2'>
                    <span className='mt-3'>Contact Us</span>
                    <span className='mt-3'>About Us</span>
                    <span className='mt-3'>Careers</span>
                    <span className='mt-3'>Flipkart Stories</span>
                    <span className='mt-3'>Press</span>
                    </div>
                    </>}
                </div>
                <div className='col-12 d-flex flex-column'>
                    <div className='col-12 d-flex flex-row justify-content-between'>
                    <h6 className='text-warning'>Contact US</h6>
                        {Con ? <><span><i class="fa-solid fa-angle-up text-success" style={{cursor:'pointer'}} onClick={()=>{SetCon(false)}}></i></span></> : <><span><i style={{cursor:'pointer'}} class="fa-solid fa-angle-down text-success" onClick={()=>{SetCon(true)}}></i></span></>}
                    </div>
                    {Con&&<>
                    <div className='col-12 d-flex flex-column text-light mb-2'>
                    <span className='mt-3'> <i class="fa-solid fa-location-dot ml-3"></i>    Ardente Office One Block-1, First floor Unit No - F-1115 Sadarmangala road, Hoodi, Circle, Whitefield, Bengaluru, Karnataka 560048</span>
                    <span className='mt-3'><i class="fa-solid fa-phone-volume mr-2"></i>  (+91) 08042072181</span>
                    <span className='mt-3'><i class="fa-regular fa-envelope mr-2"></i>support@cloudsoftwaresolution.con</span>

                    </div>
                    </>}
                </div>
            </div>

            {/* <div className='p-4  d-none d-lg-block d-lg-flex flex-lg-row text-white' style={{background:'#1F4C94',borderTop:'2px solid gray'}}>
               <div className='ml-3'>
                    <span className='p-3'>Pricing Table </span>
                    <span className='p-2' style={{borderRight:'1px solid gray'}}></span>
                    <span className='p-3'>Typography</span>
                    <span className='p-2' style={{borderRight:'1px solid gray'}}></span>
                    <span className='p-3'>Sitemap</span>
                    <span className='p-2' style={{borderRight:'1px solid gray'}}></span>
                    <span className='p-3'>Services</span>
            
               </div>
               <div className='ml-auto mr-auto'>
                <span>Copyright © 2024 Templatemela</span>
               </div>
            </div>
            <div className='p-4 bg-primary d-block d-lg-none d-flex flex-column text-white'>
               <div className='ml-auto mr-auto'>
                    <span className='p-1'>Pricing </span>
                    <span className='p-1' style={{borderRight:'1px solid white'}}></span>
                    <span className='p-1'>Typography</span>
                    <span className='p-1' style={{borderRight:'1px solid white'}}></span>
                    <span className='p-1'>Sitemap</span>
                    <span className='p-1' style={{borderRight:'1px solid white'}}></span>
                    <span className='p-1'>Services</span>
            
               </div>
               <div className='ml-auto mr-auto mt-5'>
                <span>Copyright © 2024 Templatemela</span>
               </div>
            </div> */}

        </>
    )
}

export default Footer