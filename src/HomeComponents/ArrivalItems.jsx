import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import img1 from './Assets/Shop1.jpg'
import img2 from './Assets/Shop3.jpg'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <small>{truncatedText}</small>;
    }
}


const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;


    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
        stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    return <div>{stars}</div>;
};


const ArrivalItems = ({ AddCartFunc }) => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    const [index, setIndex] = useState(null)
    const [Data2, setData2] = useState(null)
    const [LPop, setLPop] = useState(false)
    const [Ind, setInd] = useState(0)
    const [ClickInd, setClickInd] = useState()
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const [AddCardPop, SetAddardPop] = useState(false)
    const [AddCardAllow, SetAddCardAllow] = useState(false)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)


        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    useEffect(() => {
        const container = containerRef.current;
        const column = columnRef.current;
        if (!container || !column) return;

        const containerWidth = container.offsetWidth;
        const colWidth = column.offsetWidth;

        setStep(colWidth);
    }, [Data2]);
    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        if (direction === 'right') {
            if (scrollPosition < Data2.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft + step,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
    const AddCard = (e) => {

        const email = localStorage.getItem('email') ? localStorage.getItem('email') : false
        if (email) {

            return
        }
        else {
            setLPop(true)
        }
        return

    }
    const CheckAddCard = async (e1) => {

        const email = localStorage.getItem('email') ? localStorage.getItem('email') : false
        if (email) {
            const response = await axios.get("http://127.0.0.1:8000/AddCardDetails/");

            const filter = response.data.filter((e) => {
                return e.Custamer_Name.Email === localStorage.getItem('email') && e.Product_Name === e1.Product_Name.id;
            });

            if (filter.length === 0) {

                const Data = {

                    "Custamer_Name": email,
                    "Product_Name": e1.Product_Name.id
                }
                axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
                    SetAddardPop(true)
                }).catch((e) => {

                })


            } else {
                navigate('/AddCard')
            }
        } else {
            setLPop(true)
            return
        }

    };


    return (
        <>
            <div className='mt-1' style={{ overflow: 'hidden', position: 'relative', }}>
                <div className=' container-fluid d-flex flex-row justify-content-center' style={{ overflow: 'hidden', position: 'relative', }}>
                  
                    <div className=' ml-auto mr-auto d-flex flex-column'>
                    <small className='pww p-2'  >New Arrival Items</small>
                    <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'85px'}}></small>
                  </div>
                    <div className='mr-2'>
                   <i class="fa-solid fa-angles-left text-warning p-1 card ml-3 " onClick={() => handleScroll('left')} style={{fontSize:'20px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-3"  onClick={() => handleScroll('right')} style={{fontSize:'20px'}}></i>
                  </div>

                </div>
                
                <div id='scroll-container' ref={containerRef} className='col-12 mt-4 container-fluid  d-flex flex-row' style={{ height: '400px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Data2 && Data2.slice().reverse().slice(15).map((e, ind) => {



                        return (
                            <>
                                <div ref={columnRef} className='bg-white col-sm-6 col-md-4 col-lg-3 text-center' onMouseEnter={() => {
                                    setIndex(ind)
                                }} onMouseLeave={() => {
                                    setIsHovered(!isHovered)
                                    setIndex(null)
                                }} style={{ boxShadow: 'rgba(0, 0, 0, 0.0) 0px 0px 0px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }} >
                                    <div className='p-5' style={{ height: '250px', overflow: 'hidden' }}>
                                        <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ cursor: 'pointer' }} src={e.ImageUrl} alt="" height={'100%'} />


                                    </div>
                                    <div className='' style={{ height: '150px' }}>
                                        {e.Product_Name.Rating > 0 ? <>
                                            <div className='col-12 d-flex flex-row justify-content-center mb-2'>
                                                <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '5px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                    <p className='text-white'>{e.Product_Name.Rating.slice(0,3)}</p><i style={{ fontSize: '20px' }} class=" ml-auto fa-regular fa-star text-white"></i>
                                                </div>
                                            </div>
                                        </> : <>
                                        </>}
                                        <span className='pwwww' style={{ textAlign: 'start' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }} ><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                        <small className='text-success' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small> <small className='text-dark mt-auto mb-auto' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}><del><i class="fa-solid fa-indian-rupee-sign mt-2"></i>{e.Product_Name.Price}</del></small ><br></br>
                                        <small className='text-success mt-auto mb-auto'  onClick={() => { navigate('/Dis', { state: { data: e } }) }}>{e.Product_Name.Discount}%Off</small>
                                        {index === ind ? (<>
                                            <div className='d-flex flex-row justify-content-center  col-12 '>
                                                <div className='p-1 btn  mr-auto ml-auto card  ' style={{ background: '' }}>
                                                    <i onClick={() => { CheckAddCard(e) }} style={{ fontSize: '25px' }} class="fa-solid fa-cart-shopping  text-primary  "></i>
                                                </div>
                                                <div className='p-1 btn  mr-auto ml-auto card  ' style={{ background: 'white' }}>
                                                    <i onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ fontSize: '25px', color: 'forestgreen' }} class="fa-solid fa-eye "></i>
                                                </div>
                                            </div>
                                        </>) : (<></>)}
                                    </div>

                                </div>
                            </>
                        )
                    })}
                </div>
                {/* information */}
                <div className='container-fluid mt-5 '>

                    <div className=' d-none  d-md-block  d-md-flex flex-md-row card ' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}}>
                        <div className=' col-sm-12 mt-3  col-md-3 d-flex flex-row p-3 mb-2 ' style={{ borderRight: '2px solid lightgray' }}>
                            <div>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-truck-fast p-2 mr-3 text-primary"></i>
                            </div>
                            <div className='d-flex flex-column'>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Free Ship WorldWide</small>
                                <small>Above 20 Items</small>
                            </div>
                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' style={{ borderRight: '2px solid lightgray' }}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-sack-dollar p-2  text-warning"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Save 20% When You</small>
                                <small>Take Membership</small>
                            </div>

                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' style={{ borderRight: '2px solid lightgray' }}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-headset p-2 mr-3 text-danger"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>24/7 Customer Care  </small>
                                <small>Best Support</small>
                            </div>

                        </div>
                        <div className=' col-sm-12  col-md-3  d-flex flex-row  p-3 mb-2 mt-3  ' >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-piggy-bank p-2 mr-3 text-success "></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Money Back Guarantee </small>
                                <small>If you are unable</small>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Only small */}
                <div className='container-fluid mt-5  d-none d-sm-block' >
                    <div className=' d-none d-sm-block d-md-none d-sm-flex flex-sm-row card p-2' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}}>
                        <div className='col-6 d-flex flex-row p-3  ' style={{ borderRight: '2px solid lightgray' }}>
                            <div>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-truck-fast p-2 mr-3 text-primary"></i>
                            </div>
                            <div className='d-flex flex-column'>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Free Ship WorldWide</small>
                                <small>Above 20 Items</small>
                            </div>
                        </div>
                        <div className=' col-6  d-flex flex-row  p-3' >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-sack-dollar p-2  text-warning"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Save 20% When You</small>
                                <small>Take Membership</small>
                            </div>
                        </div>
                    </div>
                    <div className=' d-none d-sm-block d-md-none d-sm-flex flex-sm-row card p-2 mt-3' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}}>
                        <div className='col-12 col-sm-6   d-flex flex-row p-3   ' style={{ borderRight: '2px solid lightgray' }}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-headset p-2 mr-3 text-danger"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>24/7 Customer Care  </small>
                                <small>Best Support</small>
                            </div>

                        </div>
                        <div className='col-12 col-sm-6 d-flex flex-row  p-3   '  >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-piggy-bank p-2 mr-3 text-success "></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Money Back Guarantee </small>
                                <small>If you are unable</small>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='container-fluid  mt-5 ml-2 d-block d-sm-none '>
                    <div className=' d-block d-sm-none row   p-2' >
                        <div className='col-12 d-flex flex-row p-3 card' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}}>
                            <div>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-truck-fast p-2 mr-3 text-primary"></i>
                            </div>
                            <div className='d-flex flex-column'>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Free Ship WorldWide</small>
                                <small>Above 20 Items</small>
                            </div>
                        </div>
                        <div className=' col-12  d-flex flex-row  p-3 card mt-2 ' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}}>
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-sack-dollar p-2  text-warning"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Save 20% When You</small>
                                <small>Take Membership</small>
                            </div>
                        </div>
                        <div className='col-12   d-flex flex-row p-3  card mt-2 ' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}} >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-headset p-2 mr-3 text-danger"></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>24/7 Customer Care  </small>
                                <small>Best Support</small>
                            </div>

                        </div>
                        <div className='col-12 d-flex flex-row  p-3   card mt-2  ' style={{boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',border:'2px solid lightgray'}} >
                            <div className=''>
                                <i style={{ fontSize: '30px' }} class="fa-solid fa-piggy-bank p-2 mr-3 text-success "></i>
                            </div>
                            <div className='d-flex flex-column '>
                                <small style={{ fontWeight: 'bold', fontFamily: 'initial' }}>Money Back Guarantee </small>
                                <small>If you are unable</small>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Very small */}


                {/* <div className='container mt-5 d-sm-flex flex-sm-column d-md-flex flex-md-row'>
                    <div className='col-sm-12 col-md-8 col-lg-8 mt-2' style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                        <img className='col-12' src={img1} alt="" height={'100%'} />
                        <div className='d-flex flex-column' style={{ position: 'absolute', top: '20%', left: '15%' }}>
                            <h4 className='text-danger'>Month End Offers</h4>
                            <span className='text-primary h6'>T-Shirts,Jeans,Shirts,Formal Weras $<br></br>All Other Latest Items</span>
                            <button className='btn btn-warning' onClick={() => { navigate('/Product') }} >ShopNow</button>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 mt-2' style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                        <img className='col-12' src={img2} alt="" height={'100%'} width={"100%"} />
                        <div className='d-flex flex-column' style={{ position: 'absolute', top: '20%', left: '10%' }}>
                            <h4 className='text-primary'>Great Deals</h4>
                            <span className='text-light h6'>EarPhones,Speakers,Laptops<br></br>Console & More</span>
                            <button className=' col-9 btn btn-success' onClick={() => { navigate('/Product') }}>ShopNow</button>
                        </div>
                    </div>

                </div> */}
                {LPop && <>
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
                </>}
                {AddCardPop && <>
                    <Modal show={AddCardPop} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SetAddardPop(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-primary  pw'>Item added   successfully</span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SetAddardPop(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
            </div>

        </>
    )
}

export default ArrivalItems