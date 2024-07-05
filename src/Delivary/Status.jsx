import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ResizedImage from '../HomeComponents/ResizedImage'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar';
import DSidebar from '../DSidebar'
import { Catigories } from '../Data.jsx'
import Profile from '../Accounts/Profile.jsx';
import Footer from '../Footer.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StatusUpdatePage from '../StatusUpdatePage.jsx';
import CancelStatusUpdatePage from '../CancelStatusUpdatePage.jsx';

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

const Status = () => {
    const Location = useLocation()
    const navigate = useNavigate()
    const [Data, setData] = useState(Location.state.Product)
    const Add = JSON.parse(Location.state.Product.Adress)
    const ImageUrl = Location.state.Product.ImageUrl.ImageUrl
    const OrderId = Location.state.Product.Order_Id.Order_Id
    const Product = Location.state.Product.Order_Id.Product_Name
    const [OrderDetals, setOrderDetails] = useState([])
    const [Cancel, SetCancel] = useState(false)
    const [OProfile, SetOProfile] = useState(false)
    const [PayementData, SetPaymentData] = useState([])
    const [ReturnPop, SetReturnPOP] = useState(false)
    const [ReturnReson, SetReturnReson] = useState('')
    const [Reson, SetReson] = useState('')
    const [ResonPop, SetResonPop] = useState(false)
    const [WarningReturnPopUp, SetWarningReturnPopUp] = useState(false)
    const [WarningExchangePopUp, SetWarningExchangePopUp] = useState(false)
    const [RefundStatus, SetRefundStatus] = useState(null)
    const [AllowReturn, SetAllowReturn] = useState(true)
    const [ReturnStatus, SetReturnStatus] = useState('')
    const [AllowReturnStatus, SetAllowReturnStatus] = useState(false)
    const [ShowReturnButton, SetShowReturnButton] = useState(false)
    const [TakeUpi, SetTakeUpi] = useState(false)
    const [Upi_Id, SetUpi_Id] = useState('')
    const [Upi_IdWarning, SetUpi_IdWarning] = useState(false)
    const [UpiText, SetUpiText] = useState('')
    const [WarningTextUpi, SetWarningText] = useState('')
    const [QuantityPop, SetQuantityPop] = useState(false)
    const [QunatitySelect, SetQunatitySelect] = useState(0)
    const [Quantityarr, SetQuantityArr] = useState([])
    const [ExchangeStatus, SetExchangeStatus] = useState(false)
    const [ExchangeSuccessStatus, SetExchangeSuccessStatus] = useState(false)
    const [ExchangeDelivaryDate, SetExchangeDelivaryDate] = useState('')
    const [ShowUpdatePage, SetShowUpdatePage] = useState(false)
    const [CancelPop2, SetCancelPop2] = useState(false)
    const [CancelPop3, SetCancelPop3] = useState(false)
    const [CancelNote, SetCancelNote] = useState('')
    const [CancelStatus, SetCancelStatus] = useState('')
    const [ShowCancleStatusPage,SetShowCancelStatusPage]=useState(false)

    const HandleOpenprofile = () => {
        SetOProfile(false)
    }
    useEffect(() => {
        SelectQuanityArr()
        

        if (Location.state.Product.Order_Id.refund_id == 'No' || Location.state.Product.Order_Id.refund_id == null) {

        } else {
            const refund_id = Location.state.Product.Order_Id.refund_id
            StatusCheck2(refund_id)

        }

        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata(d.data)
        }).catch((e) => {

        })

        axios.get("http://127.0.0.1:8000/RatingDetails/", Data).then((d) => {
            const Rating = d.data
            if (d.data) {
                axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
                    const FilterData = d.data.filter((e) => {
                        return e.Order_Id.Order_Id === OrderId
                    })
                    FilterData.map((e) => {

                        Rating.map((e1) => {

                            if (e1.Product_Name === e.Order_Id.Product_Name.id && e.Custamer_Name.Email == e1.Custamer_Name.Email) {
                                e.Rating = true
                            }
                        })
                        return e
                    })


                    setOrderDetails(FilterData[0].Order_Id)

                }).catch((e) => {
                    alert('Please Try AGian Later Somthing Eroor')
                })
            }
        }).catch((e) => {
            console.log(e)
        })
        axios.get('http://127.0.0.1:8000/PaymentDetailsView/').then((d) => {
            SetPaymentData(d.data)
        }).catch((e) => {

        })
        axios.get('http://127.0.0.1:8000/RefoundDetailsView/').then((d) => {
            const filter = d.data.filter((e) => {
                const id = Location.state.Product.Order_Id.Order_Id
                return e.Order_Id == id
            })

            if (filter.length > 0) {

                SetAllowReturnStatus(true)
                const Obj = filter[0]
                StatusCheck(Obj.Payment_Id)
                SetAllowReturn(false)
            } else {
                axios.get('http://127.0.0.1:8000/ExchangeDetailsView/').then((d) => {
                    const filter = d.data.filter((e) => {
                        const id = Location.state.Product.Order_Id.Order_Id
                        return e.Order_Id == id
                    })
                    if (filter.length > 0) {
                        console.log(filter)
                        const obj = filter[0]
                        if (obj.Delivary == 'Yes') {
                            SetExchangeSuccessStatus(true)
                            SetExchangeDelivaryDate(obj.Delivary_Date)
                        }
                        SetAllowReturn(false)
                        SetExchangeStatus(true)
                    } else {
                        const vallue = Location.state.Product.Order_Id.Delivary_Type
                        if (vallue == 'Cash On Delevary') {
                            SetAllowReturn(false)
                        } else {
                            CompareDates()
                        }

                    }
                }).catch((e) => {

                })

            }
        }).catch((e) => {

        })
        if(Location.state.Product.Order_Id.process=='Process'){
            SetShowCancelStatusPage(true)
         }



    }, [])
    const HandleCanced = () => {


        if (Location.state.Product.Order_Id.Delivary_Type == 'Cash On Delevary') {

            const Data = {
                "Order_Id": OrderId,
                "OrderCancel": "Yes",
                "CancelDate": new Date(),
                "Note": CancelNote,
                "process": Location.state.Product.Order_Id.Delivary_Type == 'Cash On Delevary' ? 'Completed' : 'Process',
                "refund_id": 'No'
            }

            axios.patch("http://127.0.0.1:8000/CancelOrderDetails/", Data).then((d) => {

                const Data = {
                    pk: Location.state.Product.Order_Id.Product_Name.id,
                    Stack: Number(Location.state.Product.Quantity) + Number(Location.state.Product.Order_Id.Product_Name.Stack)
                }


                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data).then((d) => {
                    if (Location.state.Product.Order_Id.Delivary_Type == 'Cash On Delevary') {
                        window.location.reload()
                    } else {


                    }


                })

            }).catch((e) => {
                console.log('error')
            })
        } else {

            refund2()
        }


    }
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
    const ReturnProduct = () => {
        if (ReturnReson == 'Other') {
            if (Reson.length == 0) {
                SetResonPop(true)
                return
            }
        }
        SetWarningReturnPopUp(true)


    }
    const refund2 = () => {
        PayementData.map(async (e) => {
            if (e.Order_Id2 == OrderDetals.Order_Id) {

                try {

                    const response = await axios.post('http://127.0.0.1:8000/initiate_refund/', {
                        paymentId: e.Payment_Id,
                        refundAmount: ((Math.trunc(Number(OrderDetals.Selling_Price) + Number(OrderDetals.Code_Using)) * Location.state.Product.Quantity) - (OrderDetals.Code_Using)),
                        note: CancelNote,
                        id: OrderDetals.Order_Id
                    });

                    const Data = {
                        "Order_Id": OrderDetals.Order_Id,
                        "OrderCancel": "Yes",
                        "CancelDate": new Date(),
                        "Note": CancelNote,
                        "process": Location.state.Product.Order_Id.Delivary_Type == 'Cash On Delevary' ? 'Completed' : 'Process',
                        "refund_id": response.data.refund_id
                    }
                    axios.patch("http://127.0.0.1:8000/CancelOrderDetails/", Data).then((d) => {

                        const Data = {
                            pk: Location.state.Product.Order_Id.Product_Name.id,
                            Stack: Number(Location.state.Product.Quantity) + Number(Location.state.Product.Order_Id.Product_Name.Stack)
                        }


                        axios.patch("http://127.0.0.1:8000/ProductDetails/", Data).then((d) => {
                            window.location.reload()
                        }).catch(() => {

                        })

                    }).catch((e) => {
                        console.log('error')
                    })


                } catch (error) {
                    console.error('Error initiating refund:', error);
                }
            }
        })
    }
    const RefundAmount = async () => {
        let note = null
        if (ReturnReson == 'Other') {
            note = Reson
        } else {
            note = ReturnReson
        }
        const name = localStorage.getItem('CustamerName')
        const email = localStorage.getItem('email');


        {
            PayementData.map(async (e) => {
                if (e.Order_Id2 == OrderDetals.Order_Id) {

                    try {

                        const response = await axios.post('http://127.0.0.1:8000/initiate_refund/', {
                            paymentId: e.Payment_Id,
                            refundAmount: ((Math.trunc(Number(OrderDetals.Selling_Price) + Number(OrderDetals.Code_Using)) * Location.state.Product.Quantity) - (OrderDetals.Code_Using)),
                            upiId: 'VenkeyLawrence@ybl',
                            note: note,
                            name: name,
                            email: email,
                            id: OrderDetals.Order_Id
                        });
                        StatusCheck(response.data.refund_id)
                        SetAllowReturn(false)
                        const Data = {
                            Payment_Id: response.data.refund_id,
                            Order_Id: OrderDetals.Order_Id,
                            Custamer_Name: localStorage.getItem('id'),
                            Price: ((Math.trunc(Number(OrderDetals.Selling_Price) + Number(OrderDetals.Code_Using)) * Location.state.Product.Quantity) - (OrderDetals.Code_Using)),
                            PaymentProcess: 'Proceed',
                            Note: note
                        }

                        axios.post('http://127.0.0.1:8000/RefoundDetailsView/', Data).then((d) => {
                            console.log(response)

                        }).catch((e) => {

                        })

                    } catch (error) {
                        console.error('Error initiating refund:', error);
                    }
                }
            })
        }

    };
    const StatusCheck = async (refun_id) => {

        const refundId = refun_id

        try {
            const response = await axios.get(`http://localhost:8000/get_refund_status/${refundId}/`).then((response) => {
                console.log(response.data.status)
                SetReturnStatus(response.data.status)
                SetAllowReturnStatus(true)
                if (!response.data.status == 'Processed') {
                    SetShowUpdatePage(true)
                }

            })


        } catch (error) {
            console.error('Error fetching refund status:', error);
        }

    }
    const StatusCheck2 = async (refun_id) => {
        const refundId = refun_id

        try {
            const response = await axios.get(`http://localhost:8000/get_refund_status/${refundId}/`).then((response) => {
                SetCancelStatus(response.data.status)
                SetCancelPop3(true)

            })


        } catch (error) {
            console.error('Error fetching refund status:', error);
        }

    }


    const CompareDates = () => {

        const DelivaryDate = Location.state.Product.Order_Id.Delivary_Date
        const inputDateObj = new Date(DelivaryDate); // Example delivery date
        const currentDateObj = new Date();
        const futureDateObj = new Date(inputDateObj);
        futureDateObj.setDate(inputDateObj.getDate() + 7);
        const inputYear = inputDateObj.getFullYear();
        const inputMonth = inputDateObj.getMonth();
        const inputDay = inputDateObj.getDate();

        const currentYear = currentDateObj.getFullYear();
        const currentMonth = currentDateObj.getMonth();
        const currentDay = currentDateObj.getDate();

        const futureYear = futureDateObj.getFullYear();
        const futureMonth = futureDateObj.getMonth();
        const futureDay = futureDateObj.getDate();
        if (
            (currentYear > inputYear ||
                (currentYear === inputYear && currentMonth > inputMonth) ||
                (currentYear === inputYear && currentMonth === inputMonth && currentDay >= inputDay)) &&
            (currentYear < futureYear ||
                (currentYear === futureYear && currentMonth < futureMonth) ||
                (currentYear === futureYear && currentMonth === futureMonth && currentDay <= futureDay))
        ) {
            SetAllowReturn(true)
        } else {
            SetAllowReturn(false)
        }



    };
    const handleValidation = (upiId) => {
        SetUpiText(upiId)
        console.log(upiId)
        const upiIdPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (upiIdPattern.test(upiId)) {
            console.log('yes')
            SetUpi_IdWarning(true)
            return true
        } else {
            console.log('no')
            SetUpi_IdWarning(false)
            return false
        }

    };
    const ExchnageOrder = () => {
        if (ReturnReson == 'Other') {
            if (Reson.length == 0) {
                SetResonPop(true)
                return
            }
        }
        let note = null
        if (ReturnReson == 'Other') {
            note = Reson
        } else {
            note = ReturnReson
        }
        if (Data.Quantity > 1 && QunatitySelect == 0) {
            SetQuantityPop(true)
            return
        }
        const Data2 = {
            Order_Id: Data.Order_Id.Order_Id,
            Custamer_Name: localStorage.getItem('id'),
            Quantity: Number(QunatitySelect),
            Note: note
        }
        axios.post('http://127.0.0.1:8000/ExchangeDetailsView/', Data2).then((d) => {
            SetAllowReturn(false)
            SetExchangeStatus(true)
        }).catch((e) => {

        })


    }

    const SelectQuanityArr = () => {
        const arr = []
        for (let c = 1; c <= Data.Quantity; c++) {
            arr.push(c)
        }
        SetQuantityArr(arr)

    }







    return (
        <>
           {ShowCancleStatusPage&&<><CancelStatusUpdatePage oid={Location.state.Product.Order_Id.Order_Id} OrderDetails={Location.state.Product.Order_Id}/></>}
            {ShowUpdatePage && <><StatusUpdatePage oid={Location.state.Product.Order_Id.Order_Id} /></>}

            <div onClick={() => { setSug([]) }} className='col-12'>
                <div className='d-flex flex-row  p-2 card mt-1' style={{ backgroundColor: 'white' }}>
                    <div className='col-md-3 col-lg-2 d-none d-md-block ml-auto'>
                        <div className='bg-primary p-2 web' style={{ borderRadius: '10px' }}>
                            <i class="fa-solid fa-bag-shopping mr-2 text-white ecom"></i><span className='ee'>E</span><span className='com'>commerce</span>
                        </div>
                    </div>
                    <div className='col-10 col-md-7 p-1 ml-auto' style={{ position: 'relative' }}>
                        <input onChange={HandleInputValue} value={inval} type="text" className='form-control web2' placeholder='search for Products Name' />
                    </div>
                    <div className='mr-2 p-2 d-flex flex-row  mt-auto mb-auto ml-auto ' onClick={() => { SetOProfile(true) }} style={{ cursor: 'pointer' }}>
                        <i class="fa-regular fa-circle-user mr-2 mt-ua h5 d-none d-md-block "></i>  <small className='d-none d-md-block ' style={{ color: 'gray', fontWeight: 'bold' }}> Profile</small>
                    </div>
                    <div className=' col-2 p-1 d-block d-md-none  mt-auto mb-auto ml-auto ' onClick={() => { SetOProfile(true) }}>
                        <i class="fa-regular fa-circle-user  mt-ua h5  " style={{ cursor: 'pointer' }}></i>
                    </div>

                </div>
                <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                    <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
                </nav>
                <div onClick={() => { setSug([]) }} className='col-12 bg-white shadow-sm p-2 mt-2'>
                    <div className='d-none d-md-block'>
                        <span>Delivery Address</span><br></br>
                        <span className='text-primary'>Name:- {Add.Name}</span><br></br>
                        <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>

                    </div>
                    <div className='d-block d-md-none'>
                        <span>Order can traked By {Add.Number} </span><br></br>
                        <span>Traking lin Shared With This SMS</span>
                        <div className='card-footer bg-white d-flex flex-row justify-content-between'>
                            <span>Manage who can acess</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div onClick={() => { setSug([]) }} className='card bg-white shadow-sm col-12' style={{ overflow: 'hidden' }}>
                    <div className='d-none d-sm-block col-12  mt-2 mb-2'>
                        <div className='col-12 d-flex flex-row'>
                            <div className='col-sm-3 col-lg-2' style={{ height: '160px', width: '100%', cursor: 'pointer' }}>
                                <img src={ImageUrl} onClick={() => {
                                    navigate("/Dis", { state: { data: OrderDetals } })
                                }} alt="" width={'100%'} height={'90%'} style={{ objectFit: 'contain' }} />

                            </div>
                            <small className='col-sm-3 col-md-3  mt-auto mb-auto d-flex flex-column'>
                                <small><TruncateWords text={Product.Product_Name} maxLength={50} /></small><br></br>
                                <small><i class="fa-solid fa-indian-rupee-sign"></i>{OrderDetals.Selling_Price}</small><br></br>

                            </small>
                            {AllowReturnStatus ? <>
                                {/* <div className='d-flex flex-column mt-auto mb-auto'>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Return</small></div>
                                    {ReturnStatus == 'processed' ? <>
                                        <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>In Process</small></div>
                                    </> : <>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Refund</small></div>
                                    </>}
                                </div> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto'>
                                            <small>Return</small>
                                        </div>

                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>
                                            {/* <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                            {/* <span className='col-3 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                        </div>

                                        <div className='mt-auto mb-auto d-flex flex-row'>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {ReturnStatus == 'processed' ? <><small>In Process</small></> : <>Refund</>}
                                        </div>
                                    </div>
                                </div>
                            </> : <> {ExchangeStatus ? <>
                                {/* <small style={{ position: 'relative' }} className='d-flex flex-column mt-auto mb-auto  '>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Exchange</small></div>
                                    {ExchangeSuccessStatus ? <>  <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>Exchanged {ExchangeDelivaryDate && new Date(ExchangeDelivaryDate).toLocaleDateString()}</small></div></> : <>  <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>In Process</small></div></>}
                                </small> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto'>
                                            <small>Exchange</small>
                                        </div>

                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>
                                            {/* <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                            {/* <span className='col-3 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                        </div>

                                        <div className='mt-auto mb-auto d-flex flex-row'>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {ExchangeSuccessStatus ? <>  <div><small></small><small className='mt-auto'>Exchanged {ExchangeDelivaryDate && new Date(ExchangeDelivaryDate).toLocaleDateString()}</small></div></> : <>  <div><small></small><small className='mt-auto'>In Process</small></div></>}
                                        </div>
                                    </div>
                                </div>
                            </> : <>
                                {/* <small style={{ position: 'relative' }} className='d-flex flex-column mt-auto mb-auto  '>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small><small className=''>Order Conformed Date, {new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</small></div>
                                    {OrderDetals.OrderCancel == 'No' ? <><div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-3' style={{ marginTop: '30px' }}>Shipped</small></div>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Out For Delivery</small></div>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className=''>Delivare</small></div></> : <>
                                        <div><span><i class="fa-solid fa-check text-white bg-danger mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Order Canceled</span></div>

                                        {CancelPop3 && <>
                                            <div><span><i class="fa-solid fa-check text-white bg-primary mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''> Refund </span></div>
                                            <div><span><i class="fa-solid fa-check text-white bg-warning mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>In Process</span></div>
                                        </>}

                                    </>}


                                </small> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto d-flex flex-column '>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Order</small>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Conformed</small>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>{new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</small>
                                        </div>
                                        {OrderDetals.OrderCancel == 'No' && <> <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Out For Delivery</small>
                                        </div>
                                        </>}
                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>
                                            {OrderDetals.OrderCancel == 'No' && <>
                                                <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                                <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                                </span>
                                                <span className='col-3 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                                <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                                </span>
                                            </>}
                                        </div>
                                        <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {OrderDetals.OrderCancel == 'No' ? <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Shipped</small></> : <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Order Canceled</small></>}

                                        </div>
                                        <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-15px', visibility: 'hidden' }}></span>
                                            {OrderDetals.OrderCancel == 'No' && <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Delivare</small></>}
                                        </div>

                                    </div>
                                </div>
                            </>}
                            </>}


                        </div>
                        <div className='' style={{ position: 'absolute', bottom: '0px', right: '20px' }}>

                            {/* {OrderDetals.Delivary === 'No' ? <><span className={`mt-2 ml-auto mr-auto ${OrderDetals.OrderCancel == "No" ? "" : "p-2"}`}>{OrderDetals.OrderCancel == "No" ? <span className='text-black' onClick={() => {
                                        SetCancelPop2(true)
                                    }}><i class="fa-regular fa-rectangle-xmark" style={{ fontSize: '15px' }}></i>Cancel</span> :<></>}</span></> : <>{AllowReturn && <><button className='ml-2 mt-2    pw' onClick={() => { SetReturnPOP(true) }}>Return</button></>}</>} */}
                            {OrderDetals.Delivary === 'No' ? <>{OrderDetals.OrderCancel == "No" ? <><small style={{ cursor: 'pointer' }} className='text-primary' onClick={() => { SetCancelPop2(true) }}><i class="fa-regular fa-rectangle-xmark text-primary mr-2" style={{ fontSize: '15px' }}></i>Cancel</small></> : <></>}</> : <>{AllowReturn && <><small className='text-primary' style={{ cursor: 'pointer' }} onClick={() => { SetReturnPOP(true) }}>Return</small></>}</>}

                        </div>
                    </div>
                    <div onClick={() => { setSug([]) }} className='mt-2 card   d-block d-sm-none'>
                        <div className='card-body mt-3  d-flex flex-row'>
                            <div className='col-5'>

                                <img onClick={() => { navigate("/Dis", { state: { data: OrderDetals } }) }} className='' src={ImageUrl} alt="" width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} />


                            </div>
                            <div className='col-7 d-flex flex-column'>
                                <small><TruncateWords text={Product.Product_Name} maxLength={50} /></small>
                                <small><i class="fa-solid fa-indian-rupee-sign"></i>{OrderDetals.Selling_Price}</small>
                            </div>
                        </div>
                        <div className='card-body d-flex flex-row'>
                            {AllowReturnStatus ? <>
                                {/* <div className='d-flex flex-column mt-auto mb-auto'>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Return</small></div>
                                    {ReturnStatus == 'processed' ? <>
                                        <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>In Process</small></div>
                                    </> : <>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Refund</small></div>
                                    </>}
                                </div> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto'>
                                            <small>Return</small>
                                        </div>

                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>
                                            {/* <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                            {/* <span className='col-3 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span> */}
                                        </div>

                                        <div className='mt-auto mb-auto d-flex flex-row'>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {ReturnStatus == 'processed' ? <><small>In Process</small></> : <>Refund</>}
                                        </div>
                                    </div>
                                </div>
                            </> : <> {ExchangeStatus ? <>
                                {/* <small style={{ position: 'relative' }} className='d-flex flex-column mt-auto mb-auto  '>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Exchange</small></div>
                                    {ExchangeSuccessStatus ? <>  <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>Exchanged {ExchangeDelivaryDate && new Date(ExchangeDelivaryDate).toLocaleDateString()}</small></div></> : <>  <div><small><i class="fa-solid fa-check text-white  mr-2" style={{ fontSize: '15px', fontWeight: 'boald', background: 'orange' }}></i></small> <small className='mt-auto'>In Process</small></div></>}
                                </small> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto'>
                                            <small>Exchange</small>
                                        </div>

                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>

                                        </div>

                                        <div className='mt-auto mb-auto d-flex flex-row'>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-6 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {ExchangeSuccessStatus ? <>  <div><small></small><small className='mt-auto'>Exchanged {ExchangeDelivaryDate && new Date(ExchangeDelivaryDate).toLocaleDateString()}</small></div></> : <>  <div><small></small><small className='mt-auto'>In Process</small></div></>}
                                        </div>
                                    </div>
                                </div>
                            </> : <>
                                {/* <small style={{ position: 'relative' }} className='d-flex flex-column mt-auto mb-auto  '>
                                    <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small><small className=''>Order Conformed Date, {new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</small></div>
                                    {OrderDetals.OrderCancel == 'No' ? <><div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-3' style={{ marginTop: '30px' }}>Shipped</small></div>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className='mt-auto'>Out For Delivery</small></div>
                                        <div><small><i class="fa-solid fa-check text-white bg-success mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></small> <small className=''>Delivare</small></div></> : <>
                                        <div><span><i class="fa-solid fa-check text-white bg-danger mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>Order Canceled</span></div>

                                        {CancelPop3 && <>
                                            <div><span><i class="fa-solid fa-check text-white bg-primary mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''> Refund </span></div>
                                            <div><span><i class="fa-solid fa-check text-white bg-warning mr-2" style={{ fontSize: '15px', fontWeight: 'boald' }}></i></span> <span className=''>In Process</span></div>
                                        </>}

                                    </>}


                                </small> */}
                                <div className=' col-sm-7 col-md-6 col-lg-6 mt-auto mb-auto  '>
                                    <div className=' card col-12' style={{ border: 'none' }}>
                                        <div className='mt-auto mb-auto d-flex flex-column '>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Order</small>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Conformed</small>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>{new Date(OrderDetals.Date).toDateString().slice(3, new Date(OrderDetals.Date).toDateString().length).slice(0, 7)}</small>
                                        </div>
                                        {OrderDetals.OrderCancel == 'No' && <> <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Out For Delivery</small>
                                        </div>
                                        </>}
                                        <div className='d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                            </span>
                                            {OrderDetals.OrderCancel == 'No' && <>
                                                <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                                <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                                </span>
                                                <span className='col-3 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px' }}></span>
                                                <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px' }}  >
                                                </span>
                                            </>}
                                        </div>
                                        <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            {OrderDetals.OrderCancel == 'No' ? <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Shipped</small></> : <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Order Canceled</small></>}

                                        </div>
                                        <div className='mt-auto mb-auto d-flex flex-row '>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', visibility: 'hidden' }}></span>
                                            <span className='bg-primary' style={{ width: '11px', height: '11px', borderRadius: '100%', visibility: 'hidden' }}  >
                                            </span>
                                            <span className='col-4 bg-primary mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-15px', visibility: 'hidden' }}></span>
                                            {OrderDetals.OrderCancel == 'No' && <><small style={{ fontSize: '10px', fontWeight: 'bold' }}>Delivare</small></>}
                                        </div>

                                    </div>
                                </div>
                            </>}
                            </>}

                        </div>
                        <div className='' style={{ position: 'absolute', top: '5px', right: '20px' }}>

                            {/* {OrderDetals.Delivary === 'No' ? <><span className={`mt-2 ml-auto mr-auto ${OrderDetals.OrderCancel == "No" ? "" : "p-2"}`}>{OrderDetals.OrderCancel == "No" ? <span className='text-black' onClick={() => {
                                        SetCancelPop2(true)
                                    }}><i class="fa-regular fa-rectangle-xmark" style={{ fontSize: '15px' }}></i>Cancel</span> :<></>}</span></> : <>{AllowReturn && <><button className='ml-2 mt-2    pw' onClick={() => { SetReturnPOP(true) }}>Return</button></>}</>} */}
                            {OrderDetals.Delivary === 'No' ? <>{OrderDetals.OrderCancel == "No" ? <><small style={{ cursor: 'pointer' }} className='text-primary' onClick={() => { SetCancelPop2(true) }}><i class="fa-regular fa-rectangle-xmark text-primary mr-2" style={{ fontSize: '15px' }}></i>Cancel</small></> : <></>}</> : <>{AllowReturn && <><small className='text-primary' style={{ cursor: 'pointer' }} onClick={() => { SetReturnPOP(true) }}>Return</small></>}</>}

                        </div>
                    </div>
                    <div className='d-block d-md-none card  mt-3 mb-2 p-2'>
                        <span>Delivery Address</span><br></br>
                        <span className='text-primary'>{Add.Name}</span><br></br>
                        <span className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                    </div>
                </div>
                {OrderDetals.Delivary_Type == 'Cash On Delevary' ? <></> : <>
                    {PayementData.map((e) => {
                        if (e.Order_Id2 == OrderDetals.Order_Id) {
                            return (
                                <>

                                    <div className='card col-12 col-md-12 mt-3 p-3 d-flex flex-column  d-sm-flex flex-sm-row '>

                                        <div className=''>
                                            <div className='p-2'>
                                                <span className='' style={{ borderBottom: '2px solid skyblue' }}>PaymentDetails</span>
                                            </div>
                                            <div className='p-2'>
                                                <span className='mt-3'><span style={{ fontWeight: 'bold' }}>Payment_Id: </span>{e.Payment_Id}</span>
                                            </div>
                                            <div className='p-2'>
                                                <span className='mt-3'><span style={{ fontWeight: 'bold' }}>Order_Id: </span>{e.Order_Id}</span>
                                            </div>
                                        </div>

                                        {OrderDetals.OrderCancel == 'Yes' && <>{OrderDetals.Delivary_Date == 'Cash On Delivary' ? <></> : <>

                                            <div className='d-flex flex-column col-12 col-sm-6'>
                                                <div className='mt-auto d-flex flex-row '>
                                                    <small style={{ fontSize: '10px', fontWeight: 'bold' }}>Cancel Refund</small>
                                                </div>
                                                <div className='d-flex flex-row mt-auto mb-auto'>
                                                    <span className='bg-danger' style={{ width: '11px', height: '11px', borderRadius: '100%', }}  >
                                                    </span>
                                                    <span className='col-10  bg-danger mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px', }}></span>
                                                    <span className='bg-danger' style={{ width: '11px', height: '11px', borderRadius: '100%', position: 'relative', marginLeft: '-3px', }}  >
                                                    </span>
                                                </div>
                                                <div className='mb-2 d-flex flex-row '>
                                                <span className='bg-danger' style={{ width: '11px', height: '11px', borderRadius: '100%',visibility:'hidden' }}  >
                                                    </span>
                                                    <span className='col-10  bg-danger mt-auto mb-auto ' style={{ height: '7px', borderRadius: '5px', position: 'relative', marginLeft: '-3px',visibility:'hidden' }}></span>
                                                    <small style={{ fontSize: '10px', fontWeight: 'bold' }}>{OrderDetals.process}</small>
                                                </div>
                                            </div>

                                        </>}</>}





                                    </div>
                                </>
                            )
                        }
                    })}
                </>}
                <div className='card col-12 col-md-12 mt-3'>

                    <span>Price Details</span>
                    <div className='d-flex flex-column col-12'>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>List Price</span>
                            <span className='ml-auto'>{Product.Price}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Selling Price</span>
                            <span className='ml-auto'>{Math.trunc(Number(OrderDetals.Selling_Price) + Number(OrderDetals.Code_Using))}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Quantity</span>
                            <span className='ml-auto'>{Location.state.Product.Quantity}</span>
                        </div>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Discount</span>
                            <span className='ml-auto'>{Product.Discount}</span>
                        </div>
                        {OrderDetals.Code_Using > 0 && <>
                            <div className='col-12 d-flex flex-row justify-content-between'>
                                <span className=''>Cupon Saving</span>
                                <span className='ml-auto'>{OrderDetals.Code_Using}</span>
                            </div>
                        </>}
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <span className=''>Handling Fee</span>
                            <span className='ml-auto'>{Product.Delivary_Charges}</span>
                        </div>
                        <div className='col-12 card-footer d-flex flex-row justify-content-between'>
                            <span className=''>Total Price</span>
                            <span className='ml-auto'>{((Math.trunc(Number(OrderDetals.Selling_Price) + Number(OrderDetals.Code_Using)) * Location.state.Product.Quantity) - (OrderDetals.Code_Using)) + Product.Delivary_Charges}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
            {Cancel && <>

                <Modal show={Cancel} >
                    <Modal.Header >
                        <Modal.Title>Cancel Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <span className='text-danger  pw'>Are You Sure To Cancel The Product</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            SetCancel(false)
                            SetCancelPop2(false)
                            HandleCanced()
                        }}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={() => { SetCancel(false) }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
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
            {ReturnPop && <>
                <div className='col-12 d-flex flex-row justify-content-center' style={{ position: 'absolute', top: '10px' }}>
                    <div className='col-12 col-md-6 card p-4'>
                        <div className='d-flex flex-row justify-content-end'>
                            <i className='fa-solid fa-xmark p-2 card btn' style={{ fontSize: '20px' }} onClick={() => {
                                SetReturnReson('')
                                SetReson('')
                                SetReturnPOP(false)
                            }}></i>
                        </div>
                        <div className=''>
                            <small className='text-danger ' style={{ borderBottom: '2px solid skyblue' }} >Please select the reason for returning the product</small>
                        </div>
                        <form action="" className='mb-2'>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="fitOrSize" className="mr-2" onChange={() => { SetReturnReson('Item Doesnt Fit Or Is The Wrong Size') }} />
                                <label htmlFor="fitOrSize">Item Doesn't Fit Or Is The Wrong Size</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="expectations" className="mr-2" onChange={() => { SetReturnReson('Item Doesnt Meet Expectations') }} />
                                <label htmlFor="expectations">Item Doesn't Meet Expectations</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="damaged" className="mr-2" onChange={() => { SetReturnReson('Item Arrived Damaged Or Defective') }} />
                                <label htmlFor="damaged">Item Arrived Damaged Or Defective</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="changedMind" className="mr-2" onChange={() => { SetReturnReson('Changed Mind') }} />
                                <label htmlFor="changedMind">Changed Mind</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="incorrectItem" className="mr-2" onChange={() => { SetReturnReson('Received Incorrect Item') }} />
                                <label htmlFor="incorrectItem">Received Incorrect Item</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="noLongerNeeded" className="mr-2" onChange={() => { SetReturnReson('No Longer Needed') }} />
                                <label htmlFor="noLongerNeeded">No Longer Needed</label>
                            </div>
                            <div className='mt-3 '>
                                <input type="radio" name="returnReason" id="otherReason" className="mr-2" onChange={() => { SetReturnReson('Other') }} />
                                <label htmlFor="otherReason">Other (Please Specify)</label><br></br>
                                {ReturnReson == 'Other' && <> <input value={Reson} type="text" name="" id="" style={{ border: 'none', borderBottom: '2px solid lightgray', outline: 'none', borderRadius: '5px' }} placeholder='Please Mention*' onChange={(e) => { SetReson(e.target.value) }} /></>}<br></br>
                                {ResonPop && <><small className='text-danger'>Please Specify </small></>}
                            </div>




                        </form>
                        {ReturnReson.length > 0 && <>
                            <div className='d-flex flex-column '>
                                <div><button className='btn btn-primary ' onClick={() => { SetWarningExchangePopUp(true) }}>Exchange</button></div>
                                <div><button className='btn btn-danger mt-3' onClick={ReturnProduct}>Return</button></div>
                            </div></>}
                    </div>

                </div>

            </>}
            {WarningReturnPopUp && <>

                <Modal show={WarningReturnPopUp} >
                    <Modal.Header >
                        <Modal.Title>Return Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <span className='text-danger  pw'>Are You Sure To Return The Product</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            SetReturnPOP(false)
                            SetWarningReturnPopUp(false)
                            RefundAmount()

                        }}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={() => { SetWarningReturnPopUp(false) }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {WarningExchangePopUp && <>

                <Modal show={WarningExchangePopUp} >
                    <Modal.Header >
                        <Modal.Title>Exchange Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <span className='text-danger  pw'>Are You Sure To Exchange The Product</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            ExchnageOrder()
                            SetReturnPOP(false)
                            SetWarningExchangePopUp(false)


                        }}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={() => { SetWarningExchangePopUp(false) }}>

                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {TakeUpi && <>

                <Modal show={TakeUpi} >
                    <Modal.Body>

                        <div className="form-group">
                            <span className='text-danger  pw'>Give Valid Upi_Id</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <form action="">
                                <label htmlFor="">Enter Upi_Id</label>
                                <input type="text" name="" id="" className='form-control' onChange={(e) => { SetUpiText(e.target.value) }} placeholder='Enter Valid Upi_Id' />
                                {Upi_Id && <>{WarningTextUpi}</>}
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            if (UpiText) {

                            } else {
                                SetUpi_Id(true)
                                SetWarningText('Please Enter  Upi_Id')
                            }

                        }}>
                            Yes
                        </Button>
                        <Button variant="primary" onClick={() => { SetTakeUpi(false) }}>

                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {CancelPop2 && <>
                <div className='col-12 d-flex flex-row justify-content-center' style={{ position: 'absolute', top: '10px' }}>
                    <div className='col-12 col-md-6 card p-4'>
                        <div className='d-flex flex-row justify-content-end'>
                            <i className='fa-solid fa-xmark p-2 card btn' style={{ fontSize: '20px' }} onClick={() => {
                                SetCancelNote('')

                                SetCancelPop2(false)
                            }}></i>
                        </div>
                        <div className=''>
                            <small className='text-danger ' style={{ borderBottom: '2px solid skyblue' }} >Please select the reason for returning the product</small>
                        </div>
                        <form action="" className='mb-2'>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="fitOrSize" className="mr-2" onChange={() => { SetCancelNote('I want to change the delivary address') }} />
                                <label htmlFor="fitOrSize">I want to change the delivary address</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="expectations" className="mr-2" onChange={() => { SetCancelNote('Iam worried about the rating/reviews') }} />
                                <label htmlFor="expectations">I'm worried about the rating/reviews</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="damaged" className="mr-2" onChange={() => { SetCancelNote('Price of the product has now decreased') }} />
                                <label htmlFor="damaged">Price of the product has now decreased</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="changedMind" className="mr-2" onChange={() => { SetCancelNote('I want to change the payment option') }} />
                                <label htmlFor="changedMind">I want to change the payment option</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="incorrectItem" className="mr-2" onChange={() => { SetCancelNote('I want change the contact details') }} />
                                <label htmlFor="incorrectItem">I want change the contact details </label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="noLongerNeeded" className="mr-2" onChange={() => { SetCancelNote('I was hoping for a shotest delivary time') }} />
                                <label htmlFor="noLongerNeeded">I was hoping for a shotest delivary time</label>
                            </div>
                            <div className='mt-3'>
                                <input type="radio" name="returnReason" id="noLongerNeeded" className="mr-2" onChange={() => { SetCancelNote('My reason are not listed here') }} />
                                <label htmlFor="noLongerNeeded">My reason are not listed here</label>
                            </div>
                        </form>
                        {CancelNote.length > 0 && <>
                            <div className='d-flex flex-column '>
                                <div><button className='btn btn-info ' onClick={() => { SetCancel(true) }}>Cancel</button></div>

                            </div></>}
                    </div>

                </div>

            </>}
            {QuantityPop && <>

                <Modal show={QuantityPop} >
                    <Modal.Body>

                        <div className="form-group d-flex flex-column">
                            <span className='text-danger  pw'>Please select the quantity of items you wish to exchange</span>
                            <span>Your total ordered quantity is {Data.Quantity}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <form action="">

                                <select onChange={(e) => { SetQunatitySelect(e.target.value) }} name="" id="">
                                    {Quantityarr.map((e) => {
                                        return (
                                            <>
                                                <option value={e}>{e}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {QunatitySelect > 0 && <>
                            <Button variant="primary" onClick={() => {
                                SetQuantityPop(false)
                                ExchnageOrder()
                            }}>
                                Contiue
                            </Button>
                        </>}
                        <Button variant="danger" onClick={() => { SetQuantityPop(false) }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
        </>
    )
}

export default Status