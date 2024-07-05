import React, { useEffect, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import './Product_Filter.css'
import { Catigories } from './Data.jsx'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


import './Filter.css'
import axios from 'axios'
import Filter from './Filter'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Nav2 from './Nav2'
import ResizedImage from './HomeComponents/ResizedImage'
import FilterSideBar from './FilterSideBar'
import Footer from './Footer.jsx'
import Profile from './Accounts/Profile.jsx'

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>;
    }
}

const Product_Filters = () => {

    const [DSide, setDSide] = useState(false)
    const Location = useLocation()
    const val = Location.state ? true : false
    const navigate = useNavigate()
    const [OnClick, setOnClick] = useState(false);
    const [Data2, setData2] = useState([])
    const [Refresh, SetRefresh] = useState([])
    const [FilterAllowValue, SetFilterAllowValue] = useState(false)
    const [ShowPage1, SetShowPage1] = useState(false)
    const [BackGround,SetBackGround]=useState(false)
    const [BackGroundInd,SetBackGroundInd]=useState(false)
    const [CardData,SetCardData]=useState([])
    const [LPop, setLPop] = useState(false)
    const [AddCardIndexs,SetAddCardIndexs]=useState([])
    useEffect(() => {
        if(localStorage.getItem('email')){
            axios.get("http://127.0.0.1:8000/AddCardDetails/").then((d)=>{
               
                 const filter=d.data.filter((e)=>{
                    return e.Custamer_Name.Email==localStorage.getItem('email')
                 })
               
                 SetCardData(filter)
            })
        }
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
            if (val) {
                const val2 = Location.state.Filter ? true : false

                if (val2) {

                } else {
                    
                    const word = Location.state.Cat.slice(0, 4).toLowerCase();
                    const FilterData = d.data.filter((e) => {
                        return e.Product_Name.Category.toLowerCase().includes(word.toLowerCase()) 
                         
                    });

                    setData2(FilterData);
                    SetRefresh(FilterData)
                    SetShowPage1(true)
                }
            } else {

                SetFilterAllowValue(true)
                setData2(d.data);
                SetRefresh(d.data)
                SetShowPage1(true)
            }


        }).catch((e) => {

        })
        
       

    }, [])

    const HandleClick = () => {


        setOnClick(!OnClick)
    }

    const [OnClick2, setOnClick2] = useState(false);
    const Callback = () => {
        setOnClick2(!OnClick2)


    }


    const DisplySidebar = () => {
        setDSide(!DSide)
    }
    const FilterData = (dataFiltered) => {

        setData2(dataFiltered)

    }
    const [data, setdata] = useState([])
    const [Sug, setSug] = useState([])
    const [DataList, SetDataLIst] = useState([])
    const [inval, setinval] = useState('')
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

        if (inval.length >= 2) {

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
    const [OProfile, SetOProfile] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }

    const AddCard = (e,index) => {

        const email = localStorage.getItem('email') ? true : false
        if (email) {
            const Data = {

                "Custamer_Name": localStorage.getItem('email'),
                "Product_Name": e.Product_Name.id
            }
            axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
               const filter=[...AddCardIndexs,index]
                SetAddCardIndexs(filter)
            }).catch((e) => {
                
            })
            return
        }
        else {
            setLPop(true)
        }
        return

    }

    return (

        <>
            {ShowPage1 ? <>
                <div className=''  >
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
                            <i class="fa-regular fa-circle-user  mt-ua h5  " style={{ cursor: 'pointer' }}></i>
                        </div>

                    </div>
                </div>
                <div style={{ width: '100%', overflowX: 'hidden' }} >
                    <Nav2 />
                </div>

                <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                    <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
                </nav>
                {/*  */}
                {!OnClick && <>
                    <div className='d-block d-md-none mt-2 d-flex flex-row justify-content-end p-2'  >
                        <small className='ftext ml-auto btn btn-secondary' style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                            setOnClick(true)
                        }}>Filter</small>
                    </div>
                </>}

                <div className='d-flex flex-row ' style={{ height: '100vh', background: '#F5F7FA', overflowX: 'hidden', scrollbarWidth:'none'}}>

                    <div onClick={()=>{ setSug([])}}  className='d-none d-md-block card mt-2 p-2 shadow-lg' style={{ width: '300px', height: '100vh', overflowY: 'auto', scrollbarWidth: 'none',borderRadius:'15px',boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px', }}>
                        {Refresh.length > 0 && <>
                            <FilterSideBar FilterData={FilterData} Refresh={Data2} FilterAllowValue={FilterAllowValue} Refresh3={Refresh} />
                        </>}
                    </div>

                    <div onClick={()=>{ setSug([])}} className=' col-12 col-md-9 ml-1 mt-2 ' style={{overflow:'hidden' }}>
                        <div className='row justify-content-between' style={{ width: '100%',  rowGap: '20px',columnGap:'20px', height:'100vh',overflow:'auto',scrollbarWidth:'none'}}>
                            {Data2 && Data2.slice().reverse().map((e, ind) => {
                             
                            
                             
                               const value=CardData.some((e1)=>{
                                   return e1.Product_Name==e.Product_Name.id
                               })
                             

                                return (
                                  
                                    <>
                                        <div className='card model p-2 ' style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset', borderRadius: '10px' }}>
                                            <div className='d-flex flex-row p-3 mt-1' style={{ height: '200px' }}>

                                                <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='zoom-effect ml-auto mr-auto' src="" alt="" srcset={e.ImageUrl} style={{ width: '95%', height: '95%', objectFit: 'contain', cursor: 'pointer' }} />

                                            </div>
                                            {e.Product_Name.Rating > 0 && <>
                                        <div style={{ position: 'absolute', top: '10px' }}>
                                            <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '7px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'><small>{e.Product_Name.Rating.slice(0,3)}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </>}
                                            <div className="d-flex flex-column    " style={{ cursor: 'pointer',height:'60px' }}>
                                                <small onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='text-dark ' style={{fontWeight:'bold'}}><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></small>
                                                <div className='d-flex flex-row'>
                                                <small className='text-success'><i className="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                                <small className='text-secondary ml-1'>|</small><small className='text-warning mt-auto mb-auto ml-1'>{e.Product_Name.Discount}%Off</small>
                                                </div>
                                            </div>
                                           {AddCardIndexs.includes(ind)||value?<>
                                            <div onMouseEnter={()=>{SetBackGround(true)
                                                 SetBackGroundInd(ind)
                                            }}  onMouseLeave={()=>{
                                            
                                                SetBackGround(false)
                                         
                                            }} onClick={() => {navigate('/Addcard')}}  className='card btn d-flex flex-row justify-content-center ml-auto mr-auto' style={{height:'40px',border:'2px solid #1F4C94',backgroundColor:`${BackGround&&(BackGroundInd==ind)?'#1F4C94':'white'}`,cursor:'pointer',width:'80%'}}>
                                               <span  className='mt-auto mb-auto pw' style={{color:`${BackGround&&(BackGroundInd==ind)?'white':'gray'}`,cursor:'pointer',fontSize:'13px'}}>Go To  Cart</span>  
                                            </div>
                                           </>:<>
                                           <div onMouseEnter={()=>{SetBackGround(true)
                                                 SetBackGroundInd(ind)
                                            }}  onMouseLeave={()=>{
                                            
                                                SetBackGround(false)
                                         
                                            }} onClick={()=>{
                                                AddCard(e,ind)
                                                
                                            }}  className='card btn d-flex flex-row justify-content-center' style={{height:'40px',border:'2px solid orange',backgroundColor:`${BackGround&&(BackGroundInd==ind)?'orange':'white'}`,cursor:'pointer'}}>
                                               <span  className='mt-auto mb-auto pw' style={{color:`${BackGround&&(BackGroundInd==ind)?'white':'orange'}`,cursor:'pointer',fontSize:'13px'}}>Add  Cart</span>  
                                            </div>
                                           </>}


                                        </div>
                                    </>
                                )
                            })}
                        </div>

                    </div>
                    <div className={`shadow-lg card  ${OnClick?'dsideee':'ddside'}`} style={{ position: 'absolute', left: '0px', top: '70px', background: 'white', height: '100vh', overflowY: 'auto', scrollbarWidth: 'none', borderRadius: '5px' }}>
                        <div>
                            <FilterSideBar FilterData={FilterData} Refresh={Data2} FilterAllowValue={FilterAllowValue} Refresh3={Refresh} HandleClick={HandleClick} />
                        </div>
                    </div>
                </div>
                {OnClick2 && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick2(false)
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
                                        window.location.reload()
                                        navigate("/Product", { state: { Cat: e } })
                                    }}>{e}</h5>
                                </div>
                            </div>

                        </>

                    )
                })}
            </div>}
                <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden', background: 'gray' }}>
                    <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
                </div>
                <div className='d-flex flex-row  p-2 card mt-1 col-12' style={{ backgroundColor: 'wheat', position: 'absolute', top: '38px', background: 'rgb(0,0,0,0)', border: 'none' }}>
                    <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto' style={{ visibility: 'hidden' }}>
                        <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                            <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                        </div>
                    </div>
                    <div className='col-10 col-md-7 p-1 ml-auto' style={{ visibility: `${Sug.length == 0 ? 'hidden' : ''}`, }}>
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
                <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                    {!OnClick && <><Footer /></>}
                </div>
                {OProfile && <>
                    <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Profile HandleOpenprofile={HandleOpenprofile} />
                    </div>
                </>}

            </> : <>
                
                <div class="d-flex flex-column align-items-center col-12 100-vw 100-vh card " style={{ height: '100vh' }}>
                    <div class=" mt-auto mb-auto d-flex flex-row" role="status">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    </div>
                </div>
            </>}
            {
                LPop && <>

                    <Modal show={LPop} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        setLPop(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-danger  pw'>Please Login</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setLPop(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }

        </>
    )
}

export default Product_Filters







