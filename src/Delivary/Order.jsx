import React, { useEffect, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import RandomNumberGenerator from '../RandomRating'
import { Catigories } from '../Data.jsx'
import Footer from '../Footer.jsx'
import Profile from '../Accounts/Profile.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Rating.css'

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

const Order = () => {
    const Data = Mobile_Data
    const navigate = useNavigate()
    const Data2 = ['Arriving Today', 'Shiped']
    const Cat = ['Electronics', 'Fashion', 'Home&Garden', 'Health&Beauty', 'Books&Media', 'Sports&OutDors', 'Toys&Games', 'Automotive', 'Jewelry&Accessories']

    const [Show, setShow] = useState(false)
    const [count, setCount] = useState(0)
    const [fr1, setfr1] = useState(true)
    const [fr2, setfr2] = useState(true)
    const [fr3, setfr3] = useState(true)
    const [fr4, setfr4] = useState(true)
    const [fr5, setfr5] = useState(true)
    const [Refres, SetRefresh] = useState([])
    const [FilterList, SetFilterList] = useState([])
    const [E, setE] = useState([])
    const [R, setR] = useState("")
    const [RIndex, SetRIndex] = useState(0)
    const [RInd, SetRInd] = useState(0)
    const [WhiteArr, SetWhiteArry] = useState([])
    const [GreenArry, SetGreenArry] = useState([])
    const [GiveRatingPop, setGiveRatingPop] = useState(false)
    const [ShowOrdersFilter, SetShowOrderFilters] = useState(false)
    const [ReturnOption, SetReturnOption] = useState([])

    const [Data3, setData3] = useState([])
    const [OProfile, SetOProfile] = useState(false)
    const [AllowPage, SetAllowPage] = useState(false)
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
        }).catch((e) => {

        })
        axios.get("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {
            const Rating = d.data
            if (d.data) {
                axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
                    const FilterData = d.data.filter((e) => {
                        return e.Custamer_Name.Email === localStorage.getItem('email')
                    })
                    FilterData.map((e) => {

                        Rating.map((e1) => {

                            if (e1.Product_Name === e.Order_Id.Product_Name.id && e.Custamer_Name.Email == e1.Custamer_Name.Email) {
                                e.Rating = true
                            }
                        })
                        return e
                    })


                    setData3(FilterData)
                    SetAllowPage(true)
                    SetRefresh(FilterData.slice().reverse())



                }).catch((e) => {

                })
            }
        }).catch((e) => {

        })
        window.scrollTo(0, 0)


    }, [])

    const Rating = () => {
        const Data = {
            "Product_Name": E.Order_Id.Product_Name.id,
            "Rating": count,
            "Rating_Lable": R,
            "Custamer_Name": localStorage.getItem('email')

        }
        const Data2 = {
            "pk": E.Order_Id.Product_Name.id,
            "username": E.Order_Id.username,
            "Rating": count
        }
        axios.post("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {

            axios.patch("http://127.0.0.1:8000/RatingAddProductDetails/", Data2).then((d) => {
                window.location.reload()
            }).catch((e) => {

            })

        }).catch((e) => {

        })

    }
    const HandleonCHnage = (event) => {
        const value = event.target.value
        if (value.length > 2) {
            const Filter = Refres.filter((e) => {
                console.log(e.Order_Id.Product_Name.Product_Name.toLowerCase())
                if (e.Order_Id.Product_Name.Product_Name.toLowerCase().includes(value.toLowerCase())) {
                    return e
                }
            })
            setData3(Filter)
        } else {
            setData3(Refres.slice().reverse())
        }
    }
    useEffect(() => {
        if (FilterList.length > 0) {
            if (ReturnOption == 0) {
                const List = []
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                const getY1 = new Date().getFullYear() - 1
                const getY2 = new Date().getFullYear() - 2
                const getY3 = new Date().getFullYear() - 3
                const Filters = FilterList.filter((val) => {
                    const Fi = Refres.filter((e) => {
                        const ToDay = new Date().toLocaleDateString()
                        const orderdate = new Date(e.Order_Id.Date).toLocaleDateString()
                        const oderyear = new Date(e.Order_Id.Date).getFullYear()


                        if (((e.Order_Id.Delivary == 'Yes') && 'Delivary'.toLocaleLowerCase().includes(val)) || ((e.Order_Id.OrderCancel == 'Yes' && (e.Order_Id.Delivary == 'No') && 'Canceled'.toLocaleLowerCase().includes(val)))
                            || (orderdate <= ToDay && orderdate >= thirtyDaysAgo.toLocaleDateString()) && ('last 30'.includes(val.toLocaleLowerCase()) || (oderyear == getY1 && val == getY1) ||
                                (oderyear == getY2 && val == getY2) || (oderyear == getY3 && val == getY3) || (oderyear < getY3 && val == 'old')
                                || (e.Order_Id.OrderCancel == 'No' && (e.Order_Id.Delivary == 'No') && ('ontheway'.includes(val))))
                        ) {
                            List.unshift(e)
                            return e
                        }
                    })
                })
                setData3([...new Set(List)])
            } else if (ReturnOption.length > 0) {
                    const List = []
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                    const getY1 = new Date().getFullYear() - 1
                    const getY2 = new Date().getFullYear() - 2
                    const getY3 = new Date().getFullYear() - 3
                    const Filters = FilterList.filter((val) => {
                        const Fi = Refres.filter((e) => {
                            const ToDay = new Date().toLocaleDateString()
                            const orderdate = new Date(e.Order_Id.Date).toLocaleDateString()
                            const oderyear = new Date(e.Order_Id.Date).getFullYear()


                            if (((e.Order_Id.Delivary == 'Yes') && 'Delivary'.toLocaleLowerCase().includes(val)) || ((e.Order_Id.OrderCancel == 'Yes' && (e.Order_Id.Delivary == 'No') && 'Canceled'.toLocaleLowerCase().includes(val)))
                                || (orderdate <= ToDay && orderdate >= thirtyDaysAgo.toLocaleDateString()) && ('last 30'.includes(val.toLocaleLowerCase()) || (oderyear == getY1 && val == getY1) ||
                                    (oderyear == getY2 && val == getY2) || (oderyear == getY3 && val == getY3) || (oderyear < getY3 && val == 'old')
                                    || (e.Order_Id.OrderCancel == 'No' && (e.Order_Id.Delivary == 'No') && ('ontheway'.includes(val))))
                            ) {
                                List.unshift(e)
                                return e
                            }
                        })
                    })
                    setData3([...new Set(List)])

                    const Data = [...ReturnOption]
                    SetReturnOption(Data)
                }

            } else {
                if (ReturnOption.length == 0) {
                    setData3(Refres.slice().reverse())
                } else if (ReturnOption.length > 0) {
                    const Data = [...ReturnOption]
                    SetReturnOption(Data)
                }
            }
        }, [FilterList])
    useEffect(() => {
        let War = [];
        for (let val = 0; val < (5 - RIndex); val++) {
            War.push(val);
        }
        SetWhiteArry(War);
        let Grr = [];
        for (let val = 0; val < RIndex; val++) {
            if (val < RIndex) {
                Grr.push(val);
            }
        }
        SetGreenArry(Grr);

    }, [RIndex]);
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
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
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/ExchangeDetailsView/').then((d) => {

            if (ReturnOption.length > 0 && FilterList.length > 0) {
                const Data = Data3
                const List = []
                const filter = Refres.map((e) => {
                    d.data.map((e1) => {
                        if (e1.Order_Id == e.Order_Id.Order_Id) {
                            List.push(e)
                        }
                    })
                })
                const Arry = [...List, ...Data].reverse()
                setData3([...new Set(Arry)])

            } else if (FilterList.length == 0 && ReturnOption.length == 0) {
                setData3(Refres.slice().reverse())
            } else if (ReturnOption.length > 0 && FilterList.length == 0) {
                const List = []
                const filter = Refres.map((e) => {
                    d.data.map((e1) => {
                        if (e1.Order_Id == e.Order_Id.Order_Id) {
                            List.push(e)
                        }
                    })
                })
                const Arry = [...List]
                setData3([...new Set(Arry)])

            } else if (ReturnOption.length == 0 && FilterList.length > 0) {
                const Data = [...FilterList]
                SetFilterList(Data)
            }
        }).catch((e) => {

        })

    }, [ReturnOption])



    return (
        <>
            {AllowPage ? <>
                <div className='' style={{overflow:'hidden'}}  >
                    <div className='d-flex flex-row  p-2 card mt-1' style={{ backgroundColor: 'white',overflow:'hidden' }}>
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
                <nav style={{ background: '#1F4C94',overflow:'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                    <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
                </nav>
                <div onClick={() => { setSug([]) }} className='d-flex flex-column flex-sm-row flex-md-row' style={{overflow:'hidden'}}>
                    <div className='d-none d-sm-block col-4 col-lg-3 mt-3'>
                        <div className='card-footer '>
                            <h3>Filters</h3>
                        </div>
                        <div className='card-body'>
                            <form>
                                <span className='h6'>Order Status</span>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" value={'onthe'} onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} /><small className='ml-3'>On The Way</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)

                                            } else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }

                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={'deliv'} /><small className='ml-3'>Delivered</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={'cancel'} /><small className='ml-3'>Cancelled</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                SetReturnOption(['Return'])
                                            }
                                            else {
                                                SetReturnOption([])
                                            }
                                        }} value={'Retun'} /><small className='ml-3'>Retuned</small>
                                    </div>
                                </div>
                                <h6>Order Time</h6>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={'last 30'} /><small className='ml-3'>Last 30 Days</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={`${new Date().getFullYear() - 1}`} /><small className='ml-3'>{new Date().getFullYear() - 1}</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={`${new Date().getFullYear() - 2}`} /><small className='ml-3'>{new Date().getFullYear() - 2}</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} /><small className='ml-3' value={`${new Date().getFullYear() - 3}`}>{new Date().getFullYear() - 3}</small>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                const Value = e.target.value
                                                const List = [...FilterList, Value]
                                                SetFilterList(List)
                                            }
                                            else {
                                                const List = FilterList.filter((e1) => {
                                                    if (e.target.value == e1) {

                                                    } else {
                                                        return e
                                                    }
                                                })
                                                SetFilterList(List)
                                            }
                                        }} value={'old'} /><small className='ml-3'>older</small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-12 col-sm-8 col-md-8 col-lg-9' style={{overflow:'hidden'}}>
                        <div className='d-flex flex-column'>
                            <div className='d-flex flex-row card-body'>
                                <input type="text" placeholder='Search Your Order' onChange={HandleonCHnage} className=' col-md-11 col-lg-12 form-control' />
                                <button className='d-block d-sm-none btn btn-primary ml-2' onClick={() => { SetShowOrderFilters(true) }}>Filters</button>
                            </div>
                            {Data3 && Data3.slice().reverse().map((e, ind) => {

                                const index = Math.floor(Math.random() * Data2.length);
                                return (
                                    <>
                                        <div className='card-footer mt-2 d-flex flex-row ' style={{ background: 'F1F3F6', position: 'relative' }}>
                                            <div className='col-5 col-sm-3 col-lg-2' style={{height:'120px'}} onClick={() => {
                                                navigate("/Sta", { state: { Product: e } })
                                            }}>
                                                <img style={{ cursor: 'pointer',objectFit:'contain' }} src={e.ImageUrl.ImageUrl} alt="" srcset="" width={'100%'} height={'100%'}  />
                                            </div>
                                            <div className='d-flex-flex-column col-7 col-sm-9'>
                                                <div className='d-flex flex-row justify-content-between'>

                                                    {e.Order_Id.Delivary == 'Yes' ? <><small style={{ fontWeight: 'bold', color: 'gray' }}>Delivered on {new Date(e.Order_Id.Delivary_Date).toDateString().slice(0, 11)}</small></> : <>{e.Order_Id.OrderCancel == 'No' ? <></> : <small className='' ><small style={{fontWeight:'bolder',fontsize:'15px',color:'gray'}}> Canceled on {new Date(e.Order_Id.CancelDate).toDateString().slice(0, 11)}</small></small>}</>}
                                                </div>

                                                <small className=' d-none d-lg-block ' style={{color:'darkgray',fontsize:'10px'}}><TruncateWords text={e.Order_Id.Product_Name.Product_Name} maxLength={100} /></small>
                                                <small className='ml-auto mr-auto mt-auto mb-auto d-block d-lg-none' style={{color:'darkgray',fontsize:'10px'}}><TruncateWords text={e.Order_Id.Product_Name.Product_Name} maxLength={30} /></small>

                                                <div className='d-flex flex-row mt-2 justify-content-start   '>
                                                    {e.Order_Id.Product_Name.Rating > 0 ? <>
                                                        <div>
                                                            <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                                <p className='text-white' style={{ fontSize: '15px' }}>{e.Order_Id.Product_Name.Rating.slice(0, 3)}</p><i style={{ fontSize: '15px' }} class=" ml-auto fa-regular fa-star text-white mt-auto mb-auto"></i>
                                                            </div>
                                                        </div>
                                                    </> : <>


                                                    </>}


                                                </div>
                                                <div className='mt-2 d-flex flex-row justify-content-start  '>
                                                    {e.Rating ? <></>:<>{<button  onClick={() => {
                                                        setE(e)
                                                        SetRInd(ind)
                                                        setShow(!Show)
                                                    }} className=' btn  btn-success text-white   ' > <i class="fa-regular fa-star" ></i> <small >Give  Rating</small></button>}</>}
                                                </div>
                                                <div>{e.Order_Id.AdminWrite && e.Order_Id.Delivary == 'No' && <><small className='text-danger' style={{ fontWeight: 'bold' }}>{e.Order_Id.AdminWrite}</small></>}</div>

                                            </div>



                                        </div>


                                    </>
                                )

                            })}
                            {Data3.length == 0 && <><span className='text-center'>No More Orders</span></>}
                        </div>
                    </div>
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
                    <Footer />
                </div>

                {OProfile && <>
                    <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Profile HandleOpenprofile={HandleOpenprofile} />
                    </div>
                </>}
                {Show && <>
                    <Modal show={Show} className='col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3'  >

                        <Modal.Header>
                            <Modal.Title>Give Rating</Modal.Title>
                            <div className='d-flex flex-row justify-content-end '>
                                <i class="fa-solid fa-xmark text-danger " onClick={() => {
                                    setShow(false)
                                    setCount(0)
                                    setGiveRatingPop(false)
                                    SetRIndex(0)
                                }} style={{ fontSize: '25px', borderRadius: '10px' }}></i>

                            </div>
                        </Modal.Header  >

                        <Modal.Body className='p-' style={{ backgroundColor: 'white', borderRadius: '5px' }} >



                            <form onSubmit={(e) => {
                                e.preventDefault()
                                if (count == 0) {
                                    setGiveRatingPop(true)
                                    return
                                }
                                Rating()

                            }} class="rating">
                                <div class="rating__stars d-flex flex-row justify-content-between ">
                                    <input id="rating-1" class="rating__input rating__input-1" type="radio" name="rating" onClick={() => { setCount(1) }} value="1" />
                                    <input id="rating-2" class="rating__input rating__input-2" type="radio" name="rating" onClick={() => { setCount(2) }} value="2" />
                                    <input id="rating-3" class="rating__input rating__input-3" type="radio" name="rating" onClick={() => { setCount(3) }} value="3" />
                                    <input id="rating-4" class="rating__input rating__input-4" type="radio" name="rating" onClick={() => { setCount(4) }} value="4" />
                                    <input id="rating-5" class="rating__input rating__input-5" type="radio" name="rating" onClick={() => { setCount(5) }} value="5" />

                                    <label class="rating__label" for="rating-1">
                                        <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                            <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                            </g>
                                            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                    <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                    <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                    <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="rating__sr">1 star—Terrible</span>
                                    </label>
                                    <label class="rating__label" for="rating-2">
                                        <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                            <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                            </g>
                                            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                    <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                    <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                    <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="rating__sr">2 stars—Bad</span>
                                    </label>
                                    <label class="rating__label" for="rating-3">
                                        <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                            <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                            </g>
                                            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                    <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                    <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                    <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="rating__sr">3 stars—OK</span>
                                    </label>
                                    <label class="rating__label" for="rating-4">
                                        <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                            <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                            </g>
                                            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                    <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                    <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                    <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="rating__sr">4 stars—Good</span>
                                    </label>
                                    <label class="rating__label" for="rating-5">
                                        <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                            <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                            </g>
                                            <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                    <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                    <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                    <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                    <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="rating__sr">5 stars—Excellent</span>
                                    </label>




                                </div>
                                {count == 1 && <><p class="ml-auto mr-auto" data-rating="1" style={{ fontsize: '18px' }} >Terrible</p></>}
                                {count == 2 && <><p lass="ml-auto mr-auto" data-rating="2" style={{ fontsize: '18px' }} >Bad</p></>}
                                {count == 3 && <><p lass="ml-auto mr-auto" data-rating="3" style={{ fontsize: '18px' }} >OK</p></>}
                                {count == 4 && <><p lass="ml-auto mr-auto" data-rating="4" style={{ fontsize: '18px' }} >Good</p></>}
                                {count == 5 && <><p lass="ml-auto mr-auto" data-rating="5" style={{ fontsize: '18px' }} >Excellent</p></>}
                                <div className='mt-1' height='30px'>
                                    <input required onChange={(e) => { setR(e.target.value) }} className='form-control' height='100%' name="" id="" cols="30" rows="10" fontSize='10px' placeholder='Type Your Rating' />
                                </div>
                                <button type='submit' className='mt-2 mb-2 btn-primary btn ' >Submit</button><br></br>

                                {GiveRatingPop && <><span className='text-danger h6'>Select Rating</span></>}
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            {/* <div>
                               <h6  className='text-secondary ml-2 mb-2'>Don't have an account? <span className='text-danger' style={{cursor:'pointer'}} onClick={() => { navigate('/Reg') }} >Register here</span></h6>
                   </div> */}
                            <Button variant='danger' onClick={() => {
                                SetRIndex(0)
                                setCount(0)
                                setShow(!Show)
                                setGiveRatingPop(false)
                            }}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </>}
                {ShowOrdersFilter && <>
                    <div className='card-body bg-white col-10' style={{ position: 'absolute', top: '140px', left: '10px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end'>
                            <button className='btn btn-info mb-2' onClick={() => { SetShowOrderFilters(false) }}>Close</button>
                        </div>
                        <div className='card-footer '>
                            <h3>Filters</h3>
                        </div>
                        <form>
                            <span className='h6'>Order Status</span>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" value={'onthe'} checked={FilterList.includes('onthe')} onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} /><small className='ml-3'>On The Way</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)

                                        } else {
                                           
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }

                                            })
                                            SetFilterList(List)
                                         
                                        }
                                    }} value={'deliv'} checked={FilterList.includes('deliv')} /><small className='ml-3'>Delivered</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'cancel'} checked={FilterList.includes('cancel')} /><small className='ml-3'>Cancelled</small>
                                </div>
                                <div className='d-flex flex-row'>
                                <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) {
                                                SetReturnOption(['Return'])
                                            }
                                            else {
                                                SetReturnOption([])
                                            }
                                        }} value={'Retun'} checked={ReturnOption.includes('Return')} /><small className='ml-3'>Retuned</small>
                                </div>
                            </div>
                            <h6>Order Time</h6>
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'last 30'} checked={FilterList.includes('last 30')} /><small className='ml-3'>Last 30 Days</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={`${new Date().getFullYear() - 1}`} checked={FilterList.includes(`${new Date().getFullYear() - 1}`)} /><small className='ml-3'>{new Date().getFullYear() - 1}</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={`${new Date().getFullYear() - 2}`} checked={FilterList.includes(`${new Date().getFullYear() - 2}`)} /><small className='ml-3'>{new Date().getFullYear() - 2}</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} /><small className='ml-3' value={`${new Date().getFullYear() - 3}`} checked={FilterList.includes(`${new Date().getFullYear() - 3}`)}>{new Date().getFullYear() - 3}</small>
                                </div>
                                <div className='d-flex flex-row'>
                                    <input type="checkbox" onChange={(e) => {
                                        if (e.target.checked) {
                                            const Value = e.target.value
                                            const List = [...FilterList, Value]
                                            SetFilterList(List)
                                        }
                                        else {
                                            const List = FilterList.filter((e1) => {
                                                if (e.target.value == e1) {

                                                } else {
                                                    return e
                                                }
                                            })
                                            SetFilterList(List)
                                        }
                                    }} value={'old'} checked={FilterList.includes(`old`)}   /><small className='ml-3'>older</small>
                                </div>
                            </div>
                        </form>
                    </div>
                </>}
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
                <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                    <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
                </div>

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
                </div></>}
        </>
    )
}

export default Order

