import React, { useEffect, useState } from 'react'
import Card_Details from '../HomeComponents/Card_Details'
import { Mobile_Data } from '../Data/Mobile_Data'
import { json, useLocation, useNavigate } from 'react-router-dom'
import Adress from '../Delivary/Adress'
import axios from 'axios'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import { Catigories } from '../Data'
import Footer from '../Footer'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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


const Checking = () => {

    const Data = Mobile_Data
    const Prices = [0]
    const Location = useLocation()
    const [List, setList] = useState([])
    const [quantity, SetQuantity] = useState(1)
    const navigate = useNavigate()
    const [Even, SetEven] = useState(false)
    const [Chnage, setChange] = useState(true)
    const Discount = [0]
    const Delivary = []
    const [Cls, setCls] = useState(false)
    const [setAdd, SetAddres] = useState([])
    const [Add, SetAdd] = useState([])
    const [AddWarning, SetAddWarning] = useState()
    const [ListWarning, setListWaning] = useState(false)
    const [Button, setButton] = useState(false)
    const [AddPop, SetAddPop] = useState(false)
    const [LPOP, SetLPOP] = useState(false)
    const [CardData, SetCardData] = useState([])
    const [SelectSize, SetSelectSize] = useState(null)

    let count = 0
    useEffect(() => {
        window.scrollTo(0, 0)
        if (Location.state.Product ? true : false) {

            SetCardData(Location.state.Card)

            const filter = Location.state.Product.map((e) => {
                const filterobj = Location.state.Card.filter((e1) => {
                    return e1.Product_Name == e.Product_Name.id
                })
                if (filterobj.length == 1) {
                    return { ...e, Size: filterobj[0].Size }
                }
            })
            setList(filter)


        }
        else {
            SetCardData(Location.state.Card)

            const filter = Location.state.Arr.map((e) => {
                const filterobj = Location.state.Card.filter((e1) => {
                    return e1.Product_Name == e.Product_Name.id
                })
                if (filterobj.length == 1) {
                    return { ...e, Size: filterobj[0].Size }
                }
            })
            setList(filter)
        }

        axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d) => {


            const Filter = d.data.filter((d) => {
                return d.Custamer_Name === Number(localStorage.getItem('id'))
            })

            if (Filter.length > 0) {
                const Ind = localStorage.getItem('Ind') ? Number(localStorage.getItem('Ind')) : 0
                const Obj = Filter[0]
                const Arr2 = Obj.Adrss_List.split("@")
                const Ind2 = Ind < Arr2.length ? Ind : 0


                const Convesion = Arr2.map((e) => {
                    return JSON.parse(e)
                })
                SetAdd([Convesion[Ind2]])
                setChange(true)
            } else {
                SetEven(true)
                setButton(true)
            }
        }).catch((e) => {

        })


    }, [])
    const Dissplay = () => {
        axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d) => {


            const Filter = d.data.filter((d) => {
                return d.Custamer_Name === Number(localStorage.getItem('id'))
            })

            if (Filter.length > 0) {
                const Ind = localStorage.getItem('Ind') ? Number(localStorage.getItem('Ind')) : 0
                const Obj = Filter[0]
                const Arr2 = Obj.Adrss_List.split("@")
                const Ind2 = Ind < Arr2.length ? Ind : 0

                const Convesion = Arr2.map((e) => {
                    return JSON.parse(e)
                })
                SetAdd([Convesion[Ind2]])
                setChange(true)
                SetEven(false)
                setButton(false)
            } else {
                SetEven(true)
                setButton(true)
            }
        }).catch((e) => {

        })


    }
    const [editIndex, setEditIndex] = useState(null); // Keep track of the index of the product being edited
    const [Index, setIndex] = useState(null)

    const handleQuantityChange = (index, quan, type) => {
        setEditIndex(index)
        if (type == 'inc') {
            const updatedList = List.map((e, ind) => {
                if (ind === index) {
                    if (e.quantity === e.Product_Name.Stack) {
                        setCls(true)
                        setIndex(index)
                        return e
                    }
                    else {
                        const Quan = quan + 1
                        return { ...e, quantity: Quan };
                    }

                }
                else {
                    return e
                }





            });
            setList(updatedList)
        }
        else {
            const updatedList = List.map((e, ind) => {
                if (ind === index) {
                    if (e.quantity > 1) {
                        setCls(false)
                        const Quan = e.quantity - 1
                        return { ...e, quantity: Quan };
                    }
                    else {
                        return e
                    }

                } else {
                    return e;
                }

            });
            setList(updatedList);
            return


        }





    };
    function sum(arr) {

        if (arr.length > 0) {
            let Sum = 0
            for (let va of arr) {
                Sum += Number(va)
            }
            return Sum
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
    const RemoveItem = (index) => {
        const Filter = List.filter((e, ind) => {
            return ind !== index
        })

        setList(Filter)
    }
    const handleChangeSIze = (value, e) => {

        const Modify = List.map((e1) => {
            if (e1.Product_Name.id === e.Product_Name.id) {
                return { ...e, Size: value }
            } else {
                return e1
            }
        })
        console.log(Modify)

        setList(Modify)



    }




    return (
        <>

            <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>

            <h6 className='text-center text-danger' style={{ fontWeight: 'bold' }}>Order-Summery</h6>
            <div className='col-md-12 col-sm-12 card-body ml-auto mr-auto' style={{ background: '#F5F7FA' }} >
                <div className='d-flex flex-row justify-content-between '>
                    <h6>Delivary to:</h6>
                    {Button ? <><button className='btn btn-danger' onClick={() => {
                        setChange(false)
                        SetEven(true)
                        Dissplay()
                    }} >Cancel</button></> : <button className='btn btn-success' onClick={() => {
                        setChange(false)
                        SetEven(true)
                        setButton(true)
                        // Dissplay()
                    }} >Change</button>}
                </div>
                <div style={{ overflowX: 'hidden' }}>
                    {Chnage && Add && Add.map((Add) => {

                        return (
                            <>

                                <div className='d-flex flex-column flex-wrap pw' style={{ overflowX: 'hidden' }}>
                                    <span className='text-primary'><span className='text-dark span '>Name:-</span>{Add.Name}</span>
                                    <span><span className='span '> Mobile Number:-</span>{Add.Number}</span>
                                    <span className='text-dark'>{Add.House}</span>
                                    <span>{Add.Road}</span>
                                    <span>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                                </div>



                            </>
                        )
                    })}
                </div>
                {Even && Even &&
                    <div style={{ height: '100%' }}>
                        <Adress Display={Dissplay} />
                    </div>
                }
            </div>

            {/*  */}
            <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row' style={{ overflow: 'hidden' }} >
                <div className='col-sm-12 col-md-7 col-lg-8 mt-2 ' style={{ overflow: 'hidden' }} >
                    {List && List.map((Product, index) => {


                        if (Product.Product_Name.Delivary_Charges > 0) {
                            Delivary.push(Product.Product_Name.Delivary_Charges)
                        }
                        Discount.push(Product.quantity * Math.trunc((Product.Product_Name.Price * (Product.Product_Name.Discount / 100))))
                        Prices.push(Product.quantity * Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100))))

                        count += 1

                        return (
                            <React.Fragment key={index}>
                                {/* <div key={index} className='card-body mr-auto  mt-2 card' style={{ background: '#F5F7FA' }}>
                                    <div className='col-12 d-flex flex-row justify-content-end  '>
                                       

                                    </div>
                                    <div className=' mt-3 d-flex flex-row' style={{ overflowX: 'hidden' }}>
                                        <div className='col-5 col-sm-4' style={{ overflow: 'hidden' }}>
                                         
                                            <img onClick={() => {}} src={Product.ImageUrl} alt="" className='img-fluid' style={{ maxHeight: '130px', cursor: 'pointer',objectFit:'contain' }} />
                                        </div>
                                        <div className='col-7 col-sm-8 d-flex flex-column  card'>
                                        
                                            <span className='text-dark' style={{ fontSize: '15px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))}</span> <span className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{Product.Product_Name.Price}</del></span ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'>{Product.Product_Name.Discount}%Off</span><br></br>
                                            

                                        </div>
                                    </div> */}
                                {/* <div className='col-sm-12 col-md-4 mt-2'>

                                      

                                            
                                           
                                        
                                    </div> */}
                                {/* </div> */}
                                <div className='shadow-lg card mt-3  ' style={{ height: '230px' }}>
                                    {/* <i class="fa-solid fa-xmark text-dark ml-auto " onClick={() => {
                                            RemoveItem(index)

                                        }} style={{ fontSize:'10px', borderRadius: 'px',cursor:'pointer' }}></i> */}
                                    <div className='d-flex flex-row mt-auto mb-auto ml-2 '>
                                        <div className='col-4 col-sm-3 card  col-lg-3 p-2 ' style={{ height: '200px' }}>
                                            <img onClick={() => { }} src={Product.ImageUrl} alt="" className='img-fluid zoom-effect mt-1' style={{ width: '95%', height: '75%', cursor: 'pointer', objectFit: 'contain' }} />
                                            <div className='d-flex flex-row ml-auto mr-auto mt-2'>
                                                <i className="fa-solid fa-plus btn bg-primary p-1 card text-white" onClick={() => { handleQuantityChange(index, Product.quantity, 'inc') }} style={{ fontSize: '22px', height: '33px', width: '35px' }}></i>
                                                {editIndex === index ? <span className='ml-2 mr-2 mt-auto mb-auto' style={{ fontWeight: 'bold', fontSize: '15px' }}>{Product.quantity}</span> : <span className='mr-2 ml-2 mt-auto mb-auto' style={{ fontWeight: 'bold', fontSize: '15px' }}>{Product.quantity}</span>}

                                                <i className="fa-solid fa-minus btn bg-danger p-1 card text-white" onClick={() => handleQuantityChange(index, Product.quantity, 'dec')} style={{ fontSize: '22px', height: '33px', width: '35px' }}></i>
                                            </div>
                                        </div>
                                        <div className='col-8 col-sm-9 p-2 d-flex flex-column '>
                                            <div className='d-flex flex-row'>
                                                <small className=' d-none d-lg-block' style={{ color: 'gray', fontWeight: 'bold', fontSize: '11px' }}>{Product.Product_Name.Product_Name}</small>
                                                <small className='d-block d-lg-none'><TruncateWords text={Product.Product_Name.Product_Name} maxLength={40} /></small>
                                            </div>
                                            <div>
                                                <span className='text-success '>{Product.Product_Name.Discount}%Off</span>
                                            </div>
                                            <div className='d-flex flex-row'>
                                                <span className='text-dark pw '><i class="fa-solid fa-indian-rupee-sign "></i>{Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))}</span> <span className='pw ml-2'><del><i class="fa-solid fa-indian-rupee-sign"></i>{Product.Product_Name.Price}</del></span ><span className='text-danger ml-2 pww'></span>

                                            </div>

                                            {Cls && Index == index && editIndex === index && <span className='text-danger'> You Reached Out Of Stack</span>}

                                            <div className='ml-2  d-flex row ' style={{ rowGap: '10px', columnGap: '10px' }}>
                                                {/* {Product.Product_Name.Size_Of_Product.split('#').map((e) => {
                                               
                                               
                                                if (e == 'No') {

                                                } else {
                                                    return (
                                                        <>
                                                            <div className='d-flex flex-row '>
                                                                <input onChange={()=>{handleChangeSIze(e,Product)}} checked={Product.Size==e}  type="radio" name={`rr${count}`} id=""  style={{fontSize:'20px'}} /><div className='card ml-2' style={{width:'50px',height:'35px',background:'white',textAlign:'center', background:'#1F4C94',color:'white',boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.3)'}}><span className='mt-auto mb-auto'>{e}</span></div>
                                                            </div>
                                                          
                                                        </>
                                                    )
                                                }
                                            })} */}
                                            </div>

                                        </div>



                                    </div>
                                    <i class="fa-solid fa-xmark text-dar ml-auto btn x text-danger  p-1" onClick={() => {
                                        RemoveItem(index)

                                    }} style={{ position: 'absolute', top: '0px', right: '7px', fontSize: '15px', borderRadius: '5px', cursor: 'pointer' }}></i>
                                </div>

                            </React.Fragment>
                        );
                    })}

                </div>
                <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                    <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
                </div>

                <div className='col-sm-12 col-md-5 col-lg-4 mt-3'>
                    <div className='card shadow-lg'>
                        <div className='card-footer'>
                            <h6>Price Details</h6>
                        </div>
                        <div className='card-body'>
                            <div className='d-flex flex-row justify-content-between'>
                                <small style={{ fontWeight: 'bolder', fontSize: '12px' }}>Price</small>
                                <small><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{sum(Prices)}</small>
                            </div>
                            
                            <div className='d-flex flex-row justify-content-between mt-4'>

                                {Delivary.length > 0 ? <>

                                    <small style={{ fontWeight: 'bold', fontSize: '12px' }}>Delivery Charges({Delivary.length}items)</small>
                                    <div className='d-flex flex-row'>
                                        <small className='text-success ml-3'>{sum(Delivary)}</small>
                                    </div>
                                </> : <>
                                    <small style={{ fontWeight: 'bold', fontSize: '12px' }}>Delivery Charges</small>
                                    <div className='d-flex flex-row'>
                                        <del><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i></del>
                                        <small className='text-success ml-1'>Free</small>
                                    </div>
                                </>}
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <small style={{ fontWeight: 'bold', fontSize: '12px' }}>Total Items</small>
                                <small>{Prices.length - 1}</small>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <small style={{ fontWeight: 'bold', fontSize: '12px' }}>Total</small>
                                <small><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1 " style={{ color: 'black' }}></i>{sum(Prices)}</small>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='d-flex flex-row justify-content-center mt-3'>

                                <span className='text-success' >Your Total Saving For This Order </span> <span><i class="fa-solid fa-indian-rupee-sign ml-1  text-primary " style={{ color: 'black' }}></i></span><span className='text-success '>{sum(Discount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container  d-flex flex-row justify-content-center mt-4 mb-5'>

                <button className='btn btn-warning col-sm-7 col-lg-3' onClick={() => {
                    if (List.length == 0) {
                        setListWaning(true)
                        return
                    }
                    if (Add.length == 0) {
                        SetAddWarning(true)
                        return
                    }
                    localStorage.setItem('Address2', JSON.stringify(Add[0]))
                    navigate("/Pay", {
                        state: {
                            ArrList: List,
                            Price: (sum(Delivary) ? sum(Prices) + sum(Delivary) : sum(Prices)),
                            Saving: sum(Discount),
                            Delivary: sum(Delivary) ? sum(Delivary) : 0,
                            Total: Prices.length - 1
                        }
                    });

                }}
                >Continue</button>
            </div>
            {AddWarning && <>

                <Modal show={AddWarning}>
                    <Modal.Body>
                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-dark card p-1 " onClick={() => {

                                    SetAddWarning(false)
                                }} style={{ fontSize: '20px', borderRadius: '5px', cursor: 'pointer' }}></i>

                            </div>
                            <span className='text-success  pw'>Please Select Adress</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={() => {

                            SetAddWarning(false)
                        }}>Close</button>
                    </Modal.Footer>

                </Modal>
            </>}
            {ListWarning && <>
                <Modal show={ListWarning}>
                    <Modal.Body>
                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-dark card p-1 " onClick={() => {
                                    window.location.reload()
                                    setListWaning(false)
                                }} style={{ fontSize: '20px', borderRadius: '5px', cursor: 'pointer' }}></i>

                            </div>
                            <span className='text-success  pw'>Please Select Atleast One Product</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={() => {
                            window.location.reload()
                            setListWaning(false)
                        }}>Close</button>
                    </Modal.Footer>

                </Modal>

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
            <div className='mt-2 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>


        </>
    )
}

export default Checking