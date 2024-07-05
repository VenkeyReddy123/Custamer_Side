import React, { useEffect, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import RandomNumberGenerator from '../RandomRating'

const Order = () => {
    const Data = Mobile_Data
    const navigate = useNavigate()
    const Data2 = ['Arriving Today', 'Delivered Today,Feb 15', 'Delivered on Aug 04,2923', 'Delivered on June 23,2023']
    const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories']
    const [OnClick, setOnClick] = useState(false);
    const [Show, setShow] = useState(false)
    const [count, setCount] = useState(0)
    const [fr1, setfr1] = useState(true)
    const [fr2, setfr2] = useState(true)
    const [fr3, setfr3] = useState(true)
    const [fr4, setfr4] = useState(true)
    const [fr5, setfr5] = useState(true)
    const [E,setE]=useState([])
    const [R,setR]=useState('')
    const Callback = () => {
        setOnClick(!OnClick)

    }
    // Retrieve the random value using the random index
    const [Data3, setData3] = useState([])
    useEffect(() => {
       
        axios.get("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {
            const Rating=d.data
             if(d.data){
                axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
                    const FilterData = d.data.filter((e) => {
                        return e.Custamer_Name.Email === localStorage.getItem('email')
                    })
                        FilterData.map((e)=>{
                               
                             Rating.map((e1)=>{
                                
                                 if(e1.Product_Name===e.Order_Id.Product_Name.id && e.Custamer_Name.Email==e1.Custamer_Name.Email){
                                           e.Rating=true 
                                 }
                             })
                            return e
                        })
                  
                    
                    setData3(FilterData)
        
        
        
                }).catch((e) => {
                    alert('Please Try AGian Later Somthing Eroor')
                })
             }
        }).catch((e) => {
            console.log(e)
        })
        

    }, [])
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const Rating = () => {
        const Data = {
            "Product_Name": E.Order_Id.Product_Name.id,
            "Rating":count,
            "Rating_Lable":R,
            "Custamer_Name":localStorage.getItem('email')

        }
        const Data2={       
            "pk": E.Order_Id.Product_Name.id,
            "username":E.Order_Id.username,
            "Rating":count
        }
     axios.post("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {

            axios.patch("http://127.0.0.1:8000/RatingAddProductDetails/", Data2).then((d)=>{
                window.location.reload()
            }).catch((e)=>{
                console.log(e)
            })
            
        }).catch((e) => {
            console.log(e)
        })

    }

    return (
        <>
            {/* Home */}

            {/*  */}
            <nav style={{ background: '#1F4C94',overflow:'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            {/* Home */}

            <div className='d-flex flex-column flex-sm-row flex-lg-row' style={{overflow:'hidden'}}>
                <div className='d-none d-lg-block col-3 mt-3'>
                    <div className='card-footer '>
                        <h3>Filters</h3>
                    </div>
                    <div className='card-body'>
                        <form>
                            <h5>Order Status</h5>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>On The Way</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>Delivered</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>Cancelled</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>Retuned</span>
                                </div>
                            </div>
                            <h6>Order Time</h6>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>Last 30 Days</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>2023</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>2022</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>2021</span>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" /><span className='ml-3'>older</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-12 col-lg-8' style={{overflow:'hidden'}}>
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row card-body'>
                            <input type="text" placeholder='Search Your Order' className='col-lg-9' />
                            <button className=' d-none d-md-block btn btn-primary col-2 ml-2'>Search Order</button>
                            <button className='d-block d-lg-none btn btn-primary ml-2'>Filters</button>
                        </div>
                        {Data3 && Data3.slice().reverse().map((e, ind) => {

                            
                            const index = Math.floor(Math.random() * Data2.length);
                            return (
                                <>
                                    <div className='card-footer mt-2 d-flex flex-row' style={{ background: 'F1F3F6' }}>
                                        <div className='col-3'>
                                            <img src={e.ImageUrl.ImageUrl} alt="" srcset="" width={'100px'} height={'110px'} />
                                        </div>
                                        <div className='d-flex-flex-column ml-5'>
                                            <div className='d-flex flex-row justify-content-between'>
                                                <h6>    {Data2[index]} </h6>

                                            </div>
                                            <span>{e.Order_Id.Product_Name.Product_Name}</span><br></br>
                                            <div className='d-flex flex-row mt-2'>
                                            {e.Order_Id.Product_Name.Rating > 0 ? <>
                                        <div>
                                            <div style={{ width: '70px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'>{e.Order_Id.Product_Name.Rating}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </> : <>

                                       
                                    </>}
                                                
                                                {e.Rating?<><h6 
                                                className='ml-auto  btn-success text-white disabled p-2'> Thanku for   Rating</h6></>:<>{ <h6 onClick={() => {
                                                    setE(e)
                                                    setShow(!Show)
                                                }} className='ml-auto  btn-success text-white p-2'> <i class="fa-regular fa-star"></i> Give  Rating</h6> }</>}
                                            </div>

                                        </div>

                                    </div>
                                </>
                            )

                        })}
                        <span className='text-center'>No More Orders</span>
                    </div>
                </div>
            </div>
            {OnClick && <div className='col-sm-10 col-md-6 col-lg-3' style={{ height: '100%', position: 'absolute', top: '175px', left: '-20px', overflow: 'hidden' }} >
                {Cat.slice().reverse().map((e, index) => { // Reversing the order of mapped elements
                    return (
                        <div key={index} className='card-footer text-start ml-2' style={{ height: '55px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >
                            <div className='d-flex flex-row'>
                                <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                <h5 className='mt-2 text-light' onClick={() => { navigate("/Product", { state: { Cat: e } }) }}>{e}</h5>
                            </div>
                        </div>
                    )
                })}
                {/* <Carosels/>  */}
            </div>}
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} />
            </div>
            {Show && <>

                <div className=' col-10  col-sm-7 col-md-6 col-lg-3 bg-warning shadow-lg' style={{ height: '170px', position: 'absolute', top: '100px', right: '20px', overflow: 'hidden', borderRadius: '20px' }}>
                    <div className='d-flex flex-row justify-content-between'>
                        <span onClick={(e) => {
                            if (fr1) {
                                setCount(count + 1)
                                e.target.style.color = 'green'
                                setfr1(!fr1)
                            } else {
                                setCount(count - 1)
                                e.target.style.color = 'white'
                                setfr1(!fr1)
                            }

                        }} style={{ fontSize: '30px', color: 'white' }}>{<i class="fa-solid fa-star"></i>}</span>


                        <span onClick={(e) => {
                            if (fr2) {
                                setCount(count + 1)
                                e.target.style.color = 'green'
                                setfr2(!fr2)
                            } else {
                                setCount(count - 1)
                                e.target.style.color = 'white'
                                setfr2(!fr2)
                            }
                            
                        }} style={{ fontSize: '30px', color: 'white' }}>{<i class="fa-solid fa-star"></i>}</span>
                        <span onClick={(e) => {
                            if (fr3) {
                                setCount(count + 1)
                                e.target.style.color = 'green'
                                setfr3(!fr3)
                            } else {
                                setCount(count - 1)
                                e.target.style.color = 'white'
                                setfr3(!fr3)
                            }
                        }} style={{ fontSize: '30px', color: 'white' }}>{<i class="fa-solid fa-star"></i>}</span>
                        <span onClick={(e) => {
                             if (fr4) {
                                setCount(count + 1)
                                e.target.style.color = 'green'
                                setfr4(!fr4)
                            } else {
                                setCount(count - 1)
                                e.target.style.color = 'white'
                                setfr4(!fr4)
                            }
                        }} style={{ fontSize: '30px', color: 'white' }}>{<i class="fa-solid fa-star"></i>}</span>
                        <span onClick={(e) => {
                                  if (fr5) {
                                    setCount(count + 1)
                                    e.target.style.color = 'green'
                                    setfr5(!fr5)
                                } else {
                                    setCount(count - 1)
                                    e.target.style.color = 'white'
                                    setfr5(!fr5)
                                }
                        }} style={{ fontSize: '30px', color: 'white' }}>{<i class="fa-solid fa-star"></i>}</span>
                        <span  style={{color:'red',fontSize:'20px',cursor:'pointer'}} onClick={()=>{setShow(!Show)}}><i class="fa-solid fa-circle-xmark"></i></span>
                    </div>
                    {count >= 1 && count <= 2 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-regular fa-face-frown-open"></i></span></>}
                    {count > 2 && count < 4 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-regular fa-face-smile-beam"></i></span></>}
                    {count >=4 && <><span style={{ fontSize: '20px', color: 'white' }}><i class="fa-solid fa-face-laugh-beam"></i></span></>}




                    <div className='mt-1' height='30px'>
                        <input onChange={(e)=>{setR(e.target.value)}} className='form-control' height='100%' name="" id="" cols="30" rows="10" fontSize='10px' placeholder='Type Your Rating' />
                    </div>
                    <button className='mt-2 mb-2 btn-primary ' onClick={()=>{Rating()}}>Submit</button>



                </div>

            </>}

        </>
    )
}

export default Order
{/* <i class="fa-solid fa-face-smile"></i> */ }
// <i class="fa-regular fa-face-frown-open"></i>
// <i class="fa-solid fa-face-sad-tear"></i>
// <i class="fa-regular fa-face-smile-beam"></i>
// 