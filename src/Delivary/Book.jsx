import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../HomeComponents/Navbar';
import { Catigories } from '../Data'
import Footer from '../Footer';
import DSidebar from '../DSidebar';

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>
    }
}

export default function Book() {
    const navigate = useNavigate()
    const storedAddress = localStorage.getItem('Address2');
    const Add = JSON.parse(storedAddress)
    const location = useLocation()
    const Items = location.state.Items ? location.state.Items.Total : []


    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }


    return (
        <>
            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>

            <div className='d-none d-md-block col-12'>
                <div className=' shadow-sm col-12 d-flex flex-row p-3 mt-2'>
                    <div style={{ position: 'relative' }}>
                        <i class="fa-solid fa-gift text-primary" style={{ fontSize: '50px' }}></i>
                        <i class="fa-solid fa-gift text-warning" style={{ fontSize: '50px', position: 'absolute', right: '-20px' }}></i>

                    </div>
                    <div className='ml-5 d-flex flex-column'>
                        <div className='d-flex flex-row '> <span className='text-primary h6'>Thank you For Shoping  </span><span className='ml-2 text-success h6'>(total price are  <i class="fa-solid fa-indian-rupee-sign  "></i>{Number(localStorage.getItem('TotalPrice')) - localStorage.getItem('CodeDis')})</span></div>
                        <small>Total items are {Number(localStorage.getItem('TotalItems'))}</small>
                    </div>
                </div>
                <div className='col-12  mt-1 p-3 shadow-sm'>
                    <div className='col-md-7 col-lg-6 col-xl-5'>
                        <h6>Delivary Adress</h6>
                        <div className='d-flex flex-column'>
                            <span className='text-dark h5 mt-1'>{Add.Name}</span>
                            <span className='text-dark'>{Add.House}</span>
                            <span>{Add.Road}</span>
                            <span>{Add.State},{Add.City},Pin:-{Add.Pin}</span>
                        </div>
                        <h6>Phone Number <small> {Add.Number}</small></h6>
                    </div>
                </div>
                <div className='col-12 shadow-sm mt-3 p-2'>
                    {Items.map((e) => {
                        return (
                            <>
                                <div className='col-12 p-1 d-flex flex-row card'>
                                    <div className='col-md-2 col-lg-1 col-xl-1 d-flex flex-row p-1'>
                                        <img className='p-1' src="" alt="" srcset={e.ImageUrl} style={{ width: '100%', height: '100%' }} />
                                    </div>
                                    <div className='col-md-7 col-lg-5 d-flex flex-column'>
                                        <small className='' style={{ color: 'gray', fontWeight: 'b' }}>{e.Product_Name.Product_Name}</small>
                                        <small className='text-success h6'><i class="fa-solid fa-indian-rupee-sign"></i> {Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='d-flex flex-row p-3 col-6 col-lg-6 justify-content-start shadow-sm mt-3'>
                    <button className='btn btn-info ml-1' onClick={() => {
                        navigate('/Home')
                    }}> Home Page</button>
                    <button className='btn btn-warning ml-3' onClick={() => {
                        navigate('/Orders')
                    }}>Your Orders</button>
                </div>

            </div>
            <div className='col-12 d-bock d-md-none'>
                <div className=' shadow-sm col-12 d-flex flex-row p-3 mt-2'>
                    <div style={{ position: 'relative' }}>
                        <i class="fa-solid fa-gift text-primary" style={{ fontSize: '50px' }}></i>
                        <i class="fa-solid fa-gift text-warning" style={{ fontSize: '50px', position: 'absolute', right: '-20px' }}></i>

                    </div>
                    <div className='ml-5 d-flex flex-column'>
                        <div className='d-flex flex-row '> <span className='text-primary h6'>{Number(localStorage.getItem('TotalItems')) > 1 ? <>Orders</> : <>Order</>} Placed</span><span className='ml-2 text-primary h6'><i class="fa-solid fa-indian-rupee-sign  "></i> {Number(localStorage.getItem('TotalPrice')) - localStorage.getItem('CodeDis')}</span></div>
                        <small>Total Items Are {Number(localStorage.getItem('TotalItems'))}</small>
                    </div>
                </div>
                <div className='col-12 shadow-sm p-3'>
                    <div className='col-12 col-sm-11'>
                        <h6>Delivary Adress</h6>
                        <div className='d-flex flex-column'>
                            <span className='text-dark h5 mt-1'>{Add.Name}</span>
                            <span className='text-dark'>{Add.House}</span>
                            <span>{Add.Road}</span>
                            <span>{Add.State},{Add.City},Pin:-{Add.Pin}</span>
                        </div>
                        <h6>Phone Number <small> {Add.Number}</small></h6>
                    </div>
                </div>
                <div className='col-12 shadow-sm mt-3 p-2'>
                    {Items.map((e) => {
                        return (
                            <>
                                <div className='col-12 p-1 d-flex flex-row card'>
                                    <div className='col-4 col-sm-3 col-lg-1 col-xl-1 d-flex flex-row p-1'>
                                        <img className='p-1' src="" alt="" srcset={e.ImageUrl} style={{ width: '100%', height: '100%' }} />
                                    </div>
                                    <div className='col-8 col-sm-9 d-flex flex-column'>
                                        <div className='d-flex flex-row'>
                                            <small className=' d-none d-md-block' style={{ color: 'gray', fontWeight: 'bold', fontSize: '11px' }}>{e.Product_Name.Product_Name}</small>
                                            <small className='d-block d-lg-none'><TruncateWords text={e.Product_Name.Product_Name} maxLength={40} /></small>
                                        </div>
                                        <small className='text-success h6'><i class="fa-solid fa-indian-rupee-sign"></i> {Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='d-flex flex-row p-2 col-12  justify-content-start shadow-sm mt-3'>
                    <span>  </span><button className='btn btn-info' onClick={() => {
                        navigate('/Home')
                    }}> Home Page</button>
                    <button className='btn btn-warning ml-2' onClick={() => {
                        navigate('/Orders')
                    }}>Your Orders</button>
                </div>
            </div>
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100vh', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} />
            </div>
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => {
                    return (
                        <>
                            {index == 0 && <>
                                <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s`, visibility: 'hidden' }} >

                                    <div className='d-flex flex-row'>
                                        <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                        <h5 className='mt-2 text-light' onClick={() => {
                                            // window.location.reload()
                                            navigate("/Product", { state: { Cat: e } })
                                        }}>{e}</h5>
                                    </div>
                                </div>
                            </>}
                            <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                                <div className='d-flex flex-row'>
                                    <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                    <h5 className='mt-2 text-light' onClick={() => {
                                        // window.location.reload()
                                        navigate("/Product", { state: { Cat: e } })
                                    }}>{e}</h5>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>}

        </>
    )
}
