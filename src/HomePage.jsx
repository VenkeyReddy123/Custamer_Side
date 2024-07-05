import React, { Profiler, useEffect, useRef, useState } from 'react'
import './HomeComponents/Home.css'
import HomePage2 from './HomeComponents/HomePage2'
import { useNavigate } from 'react-router-dom'
import { TopDealsFM } from './HomeComponents/TopDealsFM'
import Electronic from './HomeComponents/Electronic'
import Off from '../src/HomeComponents/Off'
import DSidebar from './DSidebar'
import Navbar from './HomeComponents/Navbar'
import Footer from './Footer'
import Shop_By from './HomeComponents/Shop_By'
import axios from 'axios'
import CardImages from './HomeComponents/CardImages'
import ArrivalItems from './HomeComponents/ArrivalItems'
import Detaisl from './HomeComponents/Detaisl'
import Recamandete from './HomeComponents/Recamandete'
import './Dsidebar.css'
import Nav2 from './Nav2'
import { Shop_by as Shop } from './HomeComponents/Shop_by2'
import { Catigories } from './Data.jsx'
import Profile from './Accounts/Profile.jsx'
import Category from './HomeComponents/Category.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './PDIsply.css'

const HomePage = () => {
    const navigate = useNavigate()
    const emref = useRef(null)
    const pref = useRef(null)
    const Email = localStorage.getItem('email') ? true : false
    const [AutoComplete, SetAutoComplete] = useState()
    const [OnClick, setOnClick] = useState(false);
    const [DSide, setDSide] = useState(false)
    const [LPop, setLPop] = useState(false)
    const [EPop, SetEPop] = useState(false)
    const [PPop, setPPop] = useState(false)
    const [AddCart, SetAdCard] = useState(false)
    const [data, setdata] = useState([])
    const [Sug, setSug] = useState([])
    const [DataList, SetDataLIst] = useState([])
    const [inval, setinval] = useState('')
    const [mleav, setmlev] = useState('')
    const listRef = useRef(null)
    const [OProfile, SetOProfile] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }

    const Callback = () => {
        setOnClick(!OnClick)

    }

    const [Data2, setData2] = useState(null)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
            setData2(Shop)
        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })
        const Condition = localStorage.getItem('Count') ? true : false
        if (!Condition) {
            if (!localStorage.getItem('email')) {

                setLPop(true)
            }
        }
    }, [])
    const DisplySidebar = () => {

        setDSide(!DSide)
    }


    const HandleSubmit = () => {
        const Em = emref.current.value
        const Pas = pref.current.value
        axios.get("http://127.0.0.1:8000/LoginDetails/")
            .then((response) => {
                let data = response.data;
                let Arr = []
                for (let entry of data) {

                    if (entry.Email === Em) {

                        Arr.unshift(1)

                        if (entry.Password === Pas) {

                            localStorage.setItem('id', entry.id)

                            localStorage.setItem('CustamerName', entry.Custamer_Name)
                            localStorage.setItem('email', entry.Email);
                            localStorage.setItem('password', entry.Password);
                            localStorage.setItem('mobile_number', entry.Mobile_Number)
                            localStorage.setItem('Count', 1)
                            navigate('/Home')
                            window.location.reload()
                            return

                        } else {
                            setPPop(true)
                            return


                        }

                    }


                }

                SetEPop(true)


                if (!Arr) {
                    SetEPop(true)
                }

            })

    }
    const [Hand, setHan] = useState(false)
    const [CatData, setCatData] = useState([])
    const HandleOverCat = (Data) => {
        setCatData(Data)
        setHan(true)
    }
    const HandleRemove = () => {
        setCatData([])
        setHan(false)
    }
    const AddCartFunc = () => {
        window.location.reload()
    }
    useEffect(() => {
        if (data.length > 0) {
            const List = []
            data.map((e) => {
                List.unshift(e.Product_Name.Product_Name)
            })
            SetDataLIst(List)

        }
    }, [data])
    useEffect(() => {
        if (inval.length > 2) {
            const Filter = DataList.filter((e) => {
                return String(e).toLowerCase().includes(`${inval}`.toLowerCase());
            });

            const Filter2 = Filter.map((e) => {
                const val = e.toLowerCase()
                return val
            })
            setSug([...new Set(Filter2)]);
        } else {
            setSug([]);
        }
    }, [inval, DataList]);
    const HandleInputValue = (event) => {
        const Value = event.target.value
        if (Value.length > 0) {
            setinval(Value)

        } else {
            setinval('')
        }

    }
    const HandleNaviProduct = (val) => {
        const Filter = data.filter((pro) => {
            if (pro.Product_Name.Product_Name.toLowerCase().includes(String(val.toLowerCase()))) {
                return pro
            }
        })
        if (Filter.length > 0) {
            navigate('/Dis', { state: { data: Filter[0] } })
        }
    }






    return (
        <>
            <div  className='' onMouseEnter={HandleRemove} >
                <div className='d-flex flex-row  p-2 card mt-1' style={{ backgroundColor: 'white' }}>
                    <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto'>
                        <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                            <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                        </div>
                    </div>
                    <div className='col-10 col-md-7 p-1 ml-auto' style={{ position: 'relative' }}>
                        <input onChange={HandleInputValue} value={inval} type="text" className='form-control web2' placeholder='search for products name' />
                    </div>
                    <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto ' onClick={() => { SetOProfile(true) }} style={{ cursor: 'pointer' }}>
                        <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                    </div>
                    <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto ' onClick={() => { SetOProfile(true) }}>
                    <i class="fa-regular fa-circle-user  mt-ua h5  " style={{cursor:'pointer'}}></i>
                    </div>

                </div>
            </div>

            <nav onMouseEnter={HandleRemove} style={{ background: '#1F4C94', overflow: 'hidden' }} class="navbar navbar-expand-lg navbar-light">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>


            {/* <nav style={{ background: 'white', }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Category HandleOverCat={HandleOverCat} HandleRemove={HandleRemove} />
            </nav> */}
            <div onClick={()=>{
                HandleRemove()
                setSug([])

            }} className='d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }}>
                <HomePage2 value={OProfile} AddCartFunc={AddCartFunc} HandleRemove={HandleRemove} />
            </div>
            {/* <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <TopDealsFM />
            </div> */}
            {/* <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Electronic />
            </div> */}

            {/* <div className='mt-5 mb-2' style={{ overflowX: 'hidden' }} >
                <Recamandete />
            </div> */}

            {/* <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Off />
            </div> */}
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

                                            navigate("/Product", { state: { Cat: e } })
                                        }}>{e}</h5>
                                    </div>
                                </div>
                            </>}
                            <div key={index} className='card-footer text-start ml-2 cnameback' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                                <div className='d-flex flex-row cnames'>
                                    <i className="fa-solid fa-arrow-right mt-2  mr-3 t" style={{ fontSize: '30px' }}></i>
                                    <h5 className='mt-2 ' onClick={() => {

                                        navigate("/Product", { state: { Cat: e } })
                                    }}>{e}</h5>
                                </div>
                            </div>

                        </>

                    )
                })}
            </div>}
            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
            {LPop && <>
               
                <Modal show={LPop} >
                   
                    <Modal.Header>
                        <Modal.Title>Login</Modal.Title>
                        <div className='d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-primary " onClick={() => {
                                    setLPop(false)
                                }} style={{ fontSize: '25px', borderRadius: '10px' }}></i>

                        </div>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                          <form action="" onSubmit={(event) => {
                            event.preventDefault();
                            HandleSubmit();
                        }}>
                          <label htmlFor="recipient-name" className="col-form-label pw">Email</label>
                          <input type="text" className="form-control pw" id="recipient-name" ref={emref} placeholder='Enter valid email' />
                          <label htmlFor="recipient-name" className="col-form-label pw">Password</label>
                           <input type="password" className="form-control pw" id="recipient-name" ref={pref}  placeholder='Enter valid password' />
                           <div className='text-center'>
                                <input type="submit" value="Login" className='btn btn-warning mt-4' />
                            </div>
                          </form>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                    <div>
                                <h6  className='text-secondary ml-2 mb-2'>Don't have an account? <span className='text-danger' style={{cursor:'pointer'}} onClick={() => { navigate('/Reg') }} >Register here</span></h6>
                    </div>
                       
                    </Modal.Footer>
                </Modal>

            </>}
            {EPop && <>
                <Modal show={EPop} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    SetEPop(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Please enter valid email</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { SetEPop(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {PPop && <>
                <Modal show={PPop} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    setPPop(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>please enter valid password</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setPPop(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {Hand && CatData && <>
                <div className='p-5 shadow' style={{ position: 'absolute', top: '160px', background: 'white', marginLeft: '20px' }}>
                    {CatData.map((e) => {

                        return (
                            <>
                                <li onClick={() => {
                                    navigate("/List", { state: { Cat_Name:e, Cat: CatData } })
                                }} style={{ cursor: 'pointer' }} className='p-2 Cat'>{e}</li>
                            </>
                        )
                    })}
                </div>
            </>}
            <div className='d-flex flex-row  p-2 card mt-1 col-12' style={{ backgroundColor: 'wheat', position: 'absolute', top: '38px', background: 'rgb(0,0,0,0)', border: 'none' }}>
                <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto' style={{ visibility: 'hidden' }}>
                    <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                        <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                    </div>
                </div>
                <div className='col-10 col-md-7 p-1 ml-auto' onMouseEnter={HandleRemove} style={{ visibility: `${Sug.length == 0 ? 'hidden' : ''}`, }}>
                    <div className='col-12 card d-flex flex-comun' style={{ height: `${Sug.length > 10 ? '250px' : ''}`, overflow: `${Sug.length > 10 ? 'auto' : ''}` }}  >

                        {Sug && Sug.map((e) => {
                            return <small style={{ cursor: 'pointer' }} onClick={() => {
                                HandleNaviProduct(e)
                            }}>{e.split(" ").slice(0, 8).join(' ')}</small>
                        })}

                    </div>
                </div>
                <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto' style={{ visibility: 'hidden' }}>
                    <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                </div>
                <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto' style={{ visibility: 'hidden' }}>
                    <i class="fa-solid fa-ellipsis-vertical" style={{ fontSize: '25px' }}></i>
                </div>

            </div>
            {OProfile && <>
                <div className='col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Profile HandleOpenprofile={HandleOpenprofile} />
                </div>
            </>}



        </>
    )
}

export default HomePage
