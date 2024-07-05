import React, { useEffect, useRef, useState } from 'react'
import { Mobile_Data } from './Data/Mobile_Data'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ResizedImage from './HomeComponents/ResizedImage'
import Navbar from './HomeComponents/Navbar'
import DSidebar from './DSidebar'
import Countdown from './Countdown'
import RandomNumberGenerator from './RandomRating'
import { Catigories } from './Data.jsx'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DisplayHTML from './DisplayHTML.jsx'
import parse from 'html-react-parser';
import './PDIsply.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Footer from './Footer.jsx'
import Profile from './Accounts/Profile.jsx'
import EnhancedImage from './HomeComponents/ResizedImage'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import EnhancedImage from './HomeComponents/ResizedImage'
import tinycolor from 'tinycolor2';



class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <small>{truncatedText}</small>
    }
}


const ProductDisplay = () => {

    const Location = useLocation()
    const Data2 = Location.state.data
    const navigate = useNavigate()
    const [count, SetCount] = useState(1)
    const [Data3, setData2] = useState(null)
    const [OnClick, setOnClick] = useState(false);
    const [data, setdata] = useState([])
    const [C_Ratings, setC_Ratings] = useState([])
    const [Ind, setInd] = useState(0)
    const [Obj, setObj] = useState({})
    const [LPop, setLPop] = useState(false)
    const [Add, setAdd] = useState(false)
    const [PDRE, SetPDRE] = useState(false)
    const [OStack, SetOStack] = useState(false)
    const [PRRM, SetPRRM] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const [HD, SetHD] = useState(false)
    const [SD, SetSD] = useState(false)
    const [RD, SetRD] = useState(false)
    const [DD, SetDD] = useState(false)
    const [ColorShow, SetColorShow] = useState(false)
    const [ColorShowInd, SetColorShowInd] = useState(0)
    const [RMPDES, SETRMPD] = useState(false)
    const List_urls = []
    const [OProfile, SetOProfile] = useState(false)
    const [AddCardAllow, SetAddCardAllow] = useState(false)
    const [SelectSize,SetSelectSize]=useState(null)
    const [SizePop,SetSizePop]=useState(false)
    const [CardData,SetCardData]=useState([])
    const [PageLoding,SetPageLoding]=useState(false)
    const [BackGround,SetBackGround]=useState(false)
    const [BackGroundInd,SetBackGroundInd]=useState(false)
    const [AddCardIndexs,SetAddCardIndexs]=useState([])
    const HandleOpenprofile = () => {
        SetOProfile(false)
    }
    const Callback = () => {
        setOnClick(!OnClick)

    }
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/AddCardDetails/").then((d) => {
            const filter = d.data.filter((e) => {
                return e.Custamer_Name.Email === localStorage.getItem('email') && e.Product_Name === Data2.Product_Name.id
            })
            if (filter.length > 0) {
                SetCardData(filter)
                SetAddCardAllow(true)
            }
        }).catch((e) => {

        })
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setdata2(d.data)
            const Filter = d.data.filter((d) => {
                return Data2.Product_Name.Category_Name == d.Product_Name.Category_Name
            })
            setData2(Filter)
            SetPageLoding(true)

            const Filter2 = d.data.filter((d) => {
                return Data2.Product_Name.id == d.Product_Name.id
            })
            Filter2.slice(0, 1).map((Data2) => {
                if ((String(Data2.Product_Name.Hightlet) == 'null') || (String(Data2.Product_Name.Hightlet) == String('<p><br></p>'))) {

                } else {
                    SetHD(true)
                }
                if ((String(Data2.Product_Name.Specifications) == 'null') || (String(Data2.Product_Name.Specifications) == String('<p><br></p>'))) {

                } else {
                    SetSD(true)
                }
                if ((String(Data2.Product_Name.Description) == 'null') || (String(Data2.Product_Name.Description) == String('<p><br></p>'))) {

                } else {
                    SetDD(true)
                }


            })
            setdata(Filter2)

            const Obj = Filter2[0]
            setObj(Obj)

            axios.get("http://127.0.0.1:8000/RatingDetails/").then((d) => {
                const FilterRating = d.data.filter((e) => {
                    return e.Product_Name == Obj.Product_Name.id
                })
                setC_Ratings(FilterRating)

            })

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })


    }, [])
    const AddCard = (e) => {
    
       
        const email = localStorage.getItem('email') ? true : false
        
     
        if (email) {
          
            if(e.Product_Name.Category == 'Footware' || e.Product_Name.Category=='Clothing'){
                if(SelectSize==null){
                    SetSizePop(true)
                    return
                }else{

                }
                
            }
         
            const Data = {

                "Custamer_Name": localStorage.getItem('email'),
                "Product_Name": e.Product_Name.id,
                "Size":SelectSize==null?'No':SelectSize
            }
          
            axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
                setAdd(true)
                SetAddCardAllow(true)
            }).catch((e) => {

            })
            return
        }
        else {
            setLPop(true)
        }
        return

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    const BuyNow = (ele) => {

        if((SelectSize==null && CardData.length==0)&&(ele.Product_Name.Category=='Footware'||ele.Product_Name.Category=='CLothing')){
            SetSizePop(true)
            return
        }
        const Size=(CardData.length==0)?SelectSize:CardData[0].Size
        Obj.quantity = count
        console.log({Product_Name:ele.Product_Name.id,
            Size:Size
        })
      
        navigate('/Check', { state: { Product: [Obj] ,Card:[{Product_Name:ele.Product_Name.id,
            Size:Size
        }]} })
    }

    const StarRating = ({ rating, Custamer_Name }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;


        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        return <span className='text-success'>{stars}<spna className='text-dark'>{Custamer_Name}</spna></span>;
    };
    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [Data3]);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < Data3.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step + 50,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step - 55,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
    const [data2, setdata2] = useState([])
    const [Sug, setSug] = useState([])
    const [DataList, SetDataLIst] = useState([])
    const [inval, setinval] = useState('')
    useEffect(() => {

        if (data2.length > 0) {
            const List = []
            data2.map((e) => {
                List.unshift(e.Product_Name.Product_Name)
            })
            SetDataLIst(List)

        }
    }, [data2])

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
        
            window.location.reload()
            navigate('/Dis', { state: { data: Filter[0] } })
        }
    }
    const getColorCode = (colorName) => {

        const color = tinycolor(colorName);

        return color.isValid() ? color.toHexString() : null;

    };

    return (
        <>
           {PageLoding?<>
            <div  className=''  >
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

            <nav  style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            {/*  */}
            <div onClick={()=>{ setSug([])}} className='d-flex flex-column d-md-flex flex-md-row mt-3' style={{ overflow: 'hidden' }} >
                {/* {data && data.slice(0, 1).map((Data2) => {

                    return (
                        <>
                            <div className=' mt-2 col-11 col-md-5 ml-2 d-flex flex-row ' style={{ height: '90vh', border: '2px solid lightgray', overflowX: '' }}>
                                <div className='d-flex flex-column col-3 col-sm-2 col-md-3 align-items-center'>
                                     {Data2.List_Urls && Data2.List_Urls.split(" ").slice(0, 5).map((e, ind) => {

                                        if (Data2.List_Urls.split(" ").length % 2 === 0) {
                                            if (ind < 4) {
                                                List_urls.unshift(e)
                                            }
                                        }
                                        else {
                                            if (ind < Data2.List_Urls.split(" ").length - 1) {
                                                if (ind < 4) {
                                                    List_urls.unshift(e)
                                                }
                                            }
                                        }
                                        return (
                                            <>
                                                <div onClick={() => {
                                                    setInd(ind)
                                                }} className='mt-2' style={{ cursor: 'pointer' }}>
                                                    <img src="" alt="" srcset={e} width={'100%'} height={'70%'} />
                                                   
                                                </div>
                                            </>
                                        )
                                    })}

                                </div>
                                <div className='col-8 col-sm-9 col-md-8 p-3' style={{ height: '80%' }}>
                                    {Data2.List_Urls ? <><EnhancedImage imageUrl={Data2.List_Urls.split(" ")[Ind]} widthPercentage={100} heightPercentage={100} /></> : <>
                                        <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} width={'auto'} height={'auto'} />
                                    </>}
                                    

                               
                                 </div>



                            <div>
                            </div>
                        </div >
                            <div className=' mt-2 col-11 col-md-6 mr-2 ml-2' style={{ height: '90vh', border: '2px solid lightgray' }}>

                            </div>
                        </>
            )
                })} */}
                {data && data.slice(0, 1).map((Data2) => {
                    console.log(CardData)

                    const reactElements = parse(Data2.Product_Name.Description)


                    let Highlets = null
                    let Specification = null





                    try {

                        Highlets = parse(Data2.Product_Name.Hightlet)


                        Specification = parse(Data2.Product_Name.Specifications)
                    } catch {

                    }
                    const Divide = [];
                    let Fi = [];
                    const HTags = []
                    const arr = [1]

                    try {
                        if (Specification[0].type.includes('h')) {
                            Specification.forEach((e, ind) => {

                                if (e.type.includes('h')) {
                                    HTags.push(e)
                                    if (Fi.length > 0) {
                                        Divide.push(Fi);
                                        Fi = [];
                                    }
                                } else {
                                    Fi.push(e);
                                }
                            });

                            if (Fi.length > 0) {
                                Divide.push(Fi);
                            }

                        } else {
                            Specification.forEach((e, ind) => {
                                if (e.type.includes('h')) {
                                    if (Fi.length > 0) {
                                        HTags.push(e.props.children.props.children)
                                        Divide.push(Fi);
                                        Fi = [];
                                    }
                                    if (ind === 0) {
                                        Specification.map((e) => {


                                        })
                                    }
                                }
                            });

                            if (Fi.length > 0) {
                                Divide.push(Fi);
                            }
                        }



                    } catch {

                    }




                    return (
                        <>
                            <div className='d-none d-md-block col-12 col-md-5  col-xl-4 d-md-flex flex-md-column  card p-2  pCon ' style={{ height: '100%' }} >
                                <div className=' d-flex flex-row justify-content-arround p-3' >
                                    <div className='col-3 col-sm-2 col-md-3'>
                                        {Data2.List_Urls && Data2.List_Urls.split(" ").slice(0, 5).map((e, ind) => {
                                            if (Data2.List_Urls.split(" ").length % 2 === 0) {
                                                if (ind < 4) {
                                                    List_urls.unshift(e)
                                                }
                                            }
                                            else {
                                                if (ind < Data2.List_Urls.split(" ").length - 1) {
                                                    if (ind < 4) {
                                                        List_urls.unshift(e)
                                                    }
                                                }
                                            }
                                            return (
                                                <>
                                                    <div onClick={() => {
                                                        setInd(ind)
                                                    }} className='mt-2' style={{ cursor: 'pointer' }}>
                                                        <img src="" alt="" srcset={e} width={'100%'} height={'70%'} style={{ objectFit: 'contain' }} />
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div className='col-8 mt-3'  >
                                        {Data2.List_Urls ? <><img src={Data2.List_Urls.split(" ")[Ind]} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} /></> : <>
                                            <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'auto'} style={{ objectFit: 'contain' }} />
                                        </>}
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center mt-3 mb-3'>
                                    {AddCardAllow ? <> <button onClick={() => { navigate('/Addcard') }} className='col-5 ml-auto p-2   btn  text-white d-flex flex-row justify-content-around  ' style={{ background: 'gray', border: '2px solid gray' }}><span className='pw'>Go To Cart</span></button></> : <> <button onClick={() => { AddCard(Data2) }} className='col-5 ml-auto p-2  btn  text-white d-flex flex-row justify-content-around  ' style={{ background: '#FF9F00', border: '2px solid #FF9F00' }}><i class="fa-solid fa-heart-circle-check mt-1"></i><span>Add To Cart</span></button></>}
                                    <button onClick={() => {

                                        const email = localStorage.getItem('email') ? true : false
                                        if (email) {


                                            if (Data2.Product_Name.Stack > 0) {
                                                BuyNow(Data2)
                                            }

                                        }
                                        else {
                                            setLPop(true)

                                        }
                                    }} className={` btn btn-primary col-5 ml-auto  text-white d-flex flex-row justify-content-around ${Data2.Product_Name.Stack === 0 ? 'disabled' : ''} `} style={{ border: '1px solid skyblue' }}><i className="fa-solid fa-cart-shopping mt-2"></i><span className='mt-1'>Buy Now</span></button>
                                </div>

                            </div>
                            {/* disply in small */}
                            <div className='d-none d-md-none   d-flex flex-column  card p-2  pCon ' style={{ height: '100%' }} >
                                <div className=' d-flex flex-row justify-content-arround p-3' >
                                    <div className='col-3 col-sm-2 col-md-3' style={{marginTop:'-15px'}}>
                                        {Data2.List_Urls && Data2.List_Urls.split(" ").slice(0, 5).map((e, ind) => {
                                            if (Data2.List_Urls.split(" ").length % 2 === 0) {
                                                if (ind < 4) {
                                                    List_urls.unshift(e)
                                                }
                                            }
                                            else {
                                                if (ind < Data2.List_Urls.split(" ").length - 1) {
                                                    if (ind < 4) {
                                                        List_urls.unshift(e)
                                                    }
                                                }
                                            }
                                            return (
                                                <>
                                                    <div onClick={() => {
                                                        setInd(ind)
                                                    }} className='mt-2  ' style={{ cursor: 'pointer',width:'80px',height:'150px' }}>
                                                        <img src="" alt="" srcset={e} width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} />
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                    <div className='col-8 mt-auto  mb-auto ml-auto mr-auto'  >
                                        {Data2.List_Urls ? <><img src={Data2.List_Urls.split(" ")[Ind]} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'300px'} style={{ objectFit: 'contain' }} /></> : <>
                                            <img src={Data2.ImageUrl} alt={Data2.Product_Name.Product_Name} width={'100%'} height={'300px'} style={{ objectFit: 'contain' }} />
                                        </>}
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center mt-auto  '>
                                    {AddCardAllow ? <> <button onClick={() => { navigate('/Addcard') }} className='col-5 ml-auto p-2   btn  text-white d-flex flex-row justify-content-around  ' style={{ background: 'gray', border: '2px solid gray' }}><span className='pw'>Go To Cart</span></button></> : <> <button onClick={() => { AddCard(Data2) }} className='col-5 ml-auto p-2  btn  text-white d-flex flex-row justify-content-around  ' style={{ background: '#FF9F00', border: '2px solid #FF9F00' }}><i class="fa-solid fa-heart-circle-check mt-1"></i><span>Add To Cart</span></button></>}
                                    <button onClick={() => {

                                        const email = localStorage.getItem('email') ? true : false
                                        if (email) {


                                            if (Data2.Product_Name.Stack > 0) {
                                                BuyNow(Data2)
                                            }

                                        }
                                        else {
                                            setLPop(true)

                                        }
                                    }} className={` btn btn-primary col-5 ml-auto mr-auto  text-white d-flex flex-row justify-content-around ${Data2.Product_Name.Stack === 0 ? 'disabled' : ''} `} style={{ border: '1px solid skyblue' }}><i className="fa-solid fa-cart-shopping mt-2"></i><span className='mt-1'>Buy Now</span></button>
                                </div>

                            </div>

                            <div className='col-md-7 col-lg-8  mt-2 PCon2 ' style={{ marginBottom: '30px', overflowY: 'auto', scrollbarWidth: 'none', height: '100%' }}>
                                <h6>
                                    <small className='  d-inline-block  text-wrap text-break' style={{ color: 'gray', fontWeight: 'bold' }}>{Data2.Product_Name.Product_Name}</small>
                                    {Data2.Product_Name.Delivary_Charges == 0 ? <>
                                        <p className='text-'><del className='text-dark ml -2 mr-2'><small>No Charges</small></del><small className='text-success'>Free Delivary</small></p>
                                    </> : <>
                                    </>}
                                </h6>
                                {Data2.Product_Name.Rating > 0 ? <>
                                    <div>
                                        <div style={{ width: '45px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                            <p className='text-white'><small>{Data2.Product_Name.Rating.slice(0, 3)}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                        </div>
                                    </div>
                                </> : <>

                                    <p><small>No More Revices</small></p>
                                </>}
                                <div>
                                    <span className='text-success mr-2'><small>Saving Amount</small><span className='text-success ml-2'><i class="fa-solid fa-indian-rupee-sign mr-2"></i><small>{Math.trunc((Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</small></span></span>
                                </div>
                                <div className='d-flex flex-row align-center'>

                                    <small className='text-dark' style={{ fontSize: '20px' }}><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.trunc(Data2.Product_Name.Price - (Data2.Product_Name.Price * (Data2.Product_Name.Discount / 100)))}</small> <small className='text-dark mt-auto mb-auto ml-3'><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{Data2.Product_Name.Price}</del></small ><span className='text-danger ml-2'></span><span className='text-success mt-auto mb-auto'><small>{Data2.Product_Name.Discount}%Off</small></span>
                                </div>

                                <div className='d-flex fex-row justify-content-stat'>
                                </div>
                                <div className='d-flex flex-row'>
                                    {Data2.Product_Name.Stack > 0 && <>  <small className='text-primary'>Special offer ends in </small><span className='text-danger'><Countdown /></span></>}
                                </div>
                                <div className='d-flex flex-column'>
                                    <span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack > 0 && Data2.Product_Name.Stack <= 5 ? <><span>OnlyFew Stack Is There</span></> : <></>}</span>
                                    <div>{<><span className='text-danger' style={{ fontWeight: 'bolder' }}>{Data2.Product_Name.Stack == 0 ? <><span>Out Of Stack  </span></> : <></>}</span></>}
                                        {OStack && <><span className='text-danger' style={{ fontWeight: 'bold' }}><small>Out Of Task</small></span></>}</div>
                                </div>
                                {/* className={`mt-2 ${Data2.Product_Name.Stack == 0 ?'disabled':''}`} */}
                                <div className='mt-2'>
                                    <span style={{ fontWeight: 'bold', color: 'gray' }}>Quantity</span>
                                    <div className='d-flex flex-row text-center mt-2 mb-2'>
                                        <button className={`btn border-primary mr-2 ${Data2.Product_Name.Stack == 0 ? 'disabled' : ''}`} onClick={() => {
                                            if (Data2.Product_Name.Stack == 0) {
                                                return
                                            }
                                            else if (count < Data2.Product_Name.Stack) {
                                                SetCount(count + 1)

                                            } else {


                                                SetOStack(true)
                                            }


                                        }

                                        }><i class="fa-solid fa-plus text-primary p-2"></i></button>
                                        <span className='h4 mt-2'>{count}</span>
                                        <button className='btn border-primary ml-2' onClick={() => {
                                            if (count > 1) {
                                                SetCount(count - 1)
                                                SetOStack(false)
                                            }
                                        }}><i class="fa-solid fa-minus text-primary p-2"></i></button>
                                    </div>
                                </div>
                               




                                {HD && Highlets && <>
                                    <div className='mt-2 ml mb-2 d-flex row justify-content-between ' style={{}}>

                                        <div className='col-2 col-sm-1 col-md-1  '>
                                            <small style={{ color: 'gray', fontWeight: 'bold' }}>Highlets</small>
                                        </div>
                                        <div className='col-10 col-sm-11  col-md-11'>
                                            <small className='htext'><small>{Highlets && Highlets}</small></small>

                                        </div>

                                    </div>

                                </>}
                                {Data2.Product_Name.Color && <>
                                    <div className='d-flex flex-row justify-content-between mt-4'>
                                        <div className='col-4 col-sm-1 '>
                                            <small className='h6 text-secondary'>Colors</small>
                                        </div>
                                        <div className='col-8 col-sm-11 row justify-content-start' style={{ columnGap: '20px', rowGap: '20px' }} >

                                            {Data2.Product_Name.Color.split(',').map((e, ind) => {
                                                const cname = getColorCode(e)


                                                return (
                                                    <>
                                                        <div classname='' onMouseEnter={() => {
                                                            SetColorShow(true)
                                                            SetColorShowInd(ind)
                                                        }} onMouseLeave={() => { SetColorShow(false) }} className='shadow-lg' data-toggle="tooltip" data-placement="top" title={e} style={{ height: '50px', width: '50px', backgroundColor: cname, position: 'relative' }}>
                                                            {ColorShow && ColorShowInd == ind && <> <small className='pw' style={{ position: 'absolute', top: '-20px', fontWeight: 'lighter' }}>{e}</small></>}
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>

                                    </div>
                                </>}
                                {Data2.Product_Name.Size_Of_Product =='No' ? <></> : <>
                                    <div className='d-flex flex-row justify-content-between mt-4'>
                                        <div className='col-4 col-sm-1 '>
                                            <span className='h6 text-secondary'>Sizes</span>
                                        </div>
                                        <div className='row col-8 col-sm-11 row justify-content-start ' style={{ rowGap: '20px', columnGap: '20px' }}>
                                            {Data2.Product_Name.Size_Of_Product.split('#').map((e) => {
                                                if (e == 'No') {

                                                } else {
                                                    return (
                                                        <>
                                                           {CardData.length==1?<>
                                                           {CardData[0].Size===e&&<>
                                                            <div className='d-flex flex-row '>
                                                                <input checked={CardData[0].Size==e} onChange={()=>{SetSelectSize(e)}} type="radio" name="rr" id="" /><div className='card ml-2' style={{width:'50px',height:'35px',background:'white',textAlign:'center', background:'#1F4C94',color:'white',boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.3)'}}><span className='mt-auto mb-auto'>{e}</span></div>
                                                            </div>
                                                           </>}
                                                            </>:<>
                                                           <div className='d-flex flex-row '>
                                                                <input  onChange={()=>{SetSelectSize(e)}} type="radio" name="rr" id="" /><div className='card ml-2' style={{width:'50px',height:'35px',background:'white',textAlign:'center', background:'#1F4C94',color:'white',boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.3)'}}><span className='mt-auto mb-auto'>{e}</span></div>
                                                            </div></>}
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </>}

                                {(DD && Data2.Product_Name.Description.length > 10) && <>
                                    <div className='mt-2  d-flex flex-column card ' style={{ border: '2px solid lightgray' }}>

                                        <div className='' style={{ borderBottom: '2px solid lightgray' }}>
                                            <h5 className='p-3'>Product Descrition</h5>
                                        </div>
                                        <small className={`${RMPDES ? 'limited-lines33' : 'limited-lines22'} p-3 `}>{parse(Data2.Product_Name.Description)}</small>





                                    </div>
                                    {String(Data2.Product_Name.Description).length > 480 && <div className='card p-3' style={{ border: '2px solid lightgray' }}>
                                        {RMPDES ? <><span className='text-success h6s' onClick={() => { SETRMPD(!RMPDES) }} style={{ cursor: 'pointer', fontSize: '20px' }}>Readless</span></> : <><span onClick={() => { SETRMPD(!RMPDES) }} className='text-success h6s' style={{ cursor: 'pointer', fontSize: '20px' }}>Readmore</span></>}
                                    </div>}
                                    {/* */}
                                </>}

                                {SD && <>
                                    <div className='mt-2 card' style={{ border: '2px solidray' }}>
                                        {Data2.Product_Name.Specifications && <>
                                            <div className=''>
                                                <div className='card ' style={{ border: '' }} >
                                                    <h4 className='p-3'>Specifications</h4>
                                                </div>
                                                {Divide.length > 0 ? <>
                                                    {Divide.map((arr, ind) => {
                                                        return (
                                                            <>
                                                                {ind == 0 && !PDRE && <>
                                                                    <div className='card'>
                                                                        <small className='head p-3'>{HTags[ind]}</small>
                                                                        <div className='d-flex flex-column' style={{ position: 'relative' }}>
                                                                            <small className='p-3 sptext '>{arr}</small>
                                                                        </div>
                                                                    </div>
                                                                    {Divide.length > 1 && <div className='card p-3'>
                                                                        <small className='text-success' style={{ bottom: '0px', right: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => { SetPDRE(true) }}>{Divide.length > 1 && ind == 0 && !PDRE && <>Readmore</>}</small>
                                                                    </div>}





                                                                </>}
                                                                {PDRE && <>
                                                                    <div className='card'>
                                                                        <small className='head p-3'>{HTags[ind]}</small>
                                                                        <div className='d-flex flex-column' style={{ position: 'relative' }}>
                                                                            <small className='p-3 sptext '>{arr}</small>
                                                                        </div>
                                                                    </div>

                                                                </>}


                                                            </>
                                                        )
                                                    })}
                                                    {PDRE && <>
                                                        <div className='card p-3'>
                                                            <small className='text-success' style={{ bottom: '0px', right: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => { SetPDRE(false) }}>{<>Readless</>}</small>
                                                        </div>
                                                    </>}
                                                </> : <></>}


                                            </div>

                                        </>}
                                    </div></>}


                                {C_Ratings && <>
                                    <div className={` ${C_Ratings.length > 0 && 'card'} p-2`} overflowY='auto' >
                                        {C_Ratings.length > 0 && <span className='card p-2 h5 mt-1'>Ratings&Riviews</span>}
                                        {C_Ratings.slice().reverse().map((e, ind) => {
                                            return (
                                                <>
                                                    {(ind <= 10 && !PRRM) && <>
                                                        <div className='card p-3 mt-1'>
                                                            <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                            <p>{e.Rating_Lable}</p>
                                                        </div></>}
                                                    {PRRM && <>
                                                        <div className='card p-3 mt-1'>
                                                            <StarRating rating={e.Rating} Custamer_Name={e.Custamer_Name.Custamer_Name} />
                                                            <p>{e.Rating_Lable}</p>
                                                        </div>
                                                    </>}
                                                </>
                                            )
                                        })}
                                        {!PRRM && C_Ratings.length > 10 && <>
                                            <div className='card p-3'>
                                                <span className='text-primary h6' style={{ cursor: 'pointer' }} onClick={() => { SetPRRM(true) }}> Read All {C_Ratings.length} Reviews </span>
                                            </div>
                                        </>}


                                        {PRRM && <>
                                            <div className='card p-3 '>
                                                <span className='text-primary h6' style={{ cursor: 'pointer' }} onClick={() => { SetPRRM(false) }}> Read less Reviews </span>
                                            </div>
                                        </>}





                                    </div>
                                </>}


                            </div>
                        </>
                    )
                })}

            </div>
            {/*  */}
            <div className='d-flex flex-column mb-4' style={{ overflowX: 'hidden' }
            }>

                <div className='col-12 d-flex flex-row justify-content-between'>
                    <small className='p-3 text-primary'><i className="fa-solid fa-hashtag p-2 text-warning"></i>Suggest For You</small>
                    <div className='mr-4 mt-auto mb-auto'>
                        <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{ fontSize: '15px' }}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2" onClick={() => handleScroll('right')} style={{ fontSize: '15px' }}></i>
                    </div>
                </div>
                <div className='d-flex flex-row  col-12 ' id='scroll-container' ref={containerRef} style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>


                   
                {Data3 && Data3.slice(0, 10).map((e, ind) => {
                         const value=CardData.some((e1)=>{
                            return e1.Product_Name==e.Product_Name.id
                        })
                        return (
                            <>
                                <div style={{ width: '20px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-2   pdis' style={{ height: '240px',boxShadow:'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',borderRadius:'10px',borderLeft:'none',borderRight:'none',borderTop:'2px solid lightgray' }}>
                                    <LazyLoadImage className='p-3 ml-auto mr-auto zoom-effect d-flex flex-row justify-content-center' src={e.ImageUrl} onClick={() => {window.location.reload()
                                        navigate('/Dis', { state: { data: e } }) 
                                    }} alt="Description of the image" effect="blur" height={'175px'} width={'100%'} style={{ cursor: 'pointer', objectFit: 'contain' }} />

                                    <small className='ml-auto mr-auto pwwww' style={{ cursor: 'pointer' }} onClick={() => {window.location.reload()
                                        navigate('/Dis', { state: { data: e } }) 
                                    }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto ' style={{ cursor: 'pointer' }} onClick={() => {window.location.reload()
                                        navigate('/Dis', { state: { data: e } }) 
                                    }}>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text- mt-auto mb-auto ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
                                    </div>
                                    {e.Product_Name.Rating > 0 && <>
                                        <div style={{ position: 'absolute', top: '10px' }}>
                                            <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '7px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'><small>{e.Product_Name.Rating.slice(0,3)}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </>}
                                </div>

                            </>
                        )
                    })}

                </div>

            </div >


            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden', background: 'lightgray' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
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
             {
                SizePop && <>

                    <Modal show={SizePop} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SetSizePop(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-danger  pw'>Please select size of product</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SetSizePop(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
            {
                Add && <>
                    {/* <div className='col-12' style={{ position: 'absolute', top: '100px', right: '30px' }}>
                    <div className='col-12 d-flex flex-row justify-content-end p-2'>
                        <div className=' col-6 col-sm-4 col-md-3 col-lg-2  bg-primary text-black' style={{ fontWeight: 'bold', borderRadius: '10px', fontStyle: 'intalic' }}>
                            <div className='col-12 d-flex flex-row justify-content-end'>
                                <i class="fa-regular fa-circle-xmark text-danger p-2" onClick={() => {
                                    setAdd(false)

                                }} style={{ fontSize: '15px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}></i>

                            </div>
                            <small className='p-2 mb-3 text-white' style={{ fontWeight: 'bold', borderRadius: '30px', fontStyle: 'intalic' }}>Added Successfully</small>
                        </div>
                    </div>
                </div> */}
                    <Modal show={Add} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        setAdd(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-primary  pw'>Item added   successfully</span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setAdd(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
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
            {
                OProfile && <>
                    <div className='col-10 col-sm-7 col-md-5 col-lg-5 col-xl-3' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Profile HandleOpenprofile={HandleOpenprofile} />
                    </div>
                </>
            }</>:<>
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

export default ProductDisplay


