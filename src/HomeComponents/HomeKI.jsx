import React, { useEffect, useRef, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Producsts.css'

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

        return <small>{truncatedText}</small>;
    }
}
const HomeKI = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [step, setStep] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const [BackGround, SetBackGround] = useState(false)
    const [BackGroundInd, SetBackGroundInd] = useState(false)
    const [CardData, SetCardData] = useState([])
    const [LPop, setLPop] = useState(false)
    const [AddCardIndexs, SetAddCardIndexs] = useState([])
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
            const filter = d.data.filter((e) => {
                return e.Product_Name.Category.toLowerCase().includes('Home'.toLowerCase())
            })

            const filter2 = filter.sort((e, e1) => {
                return e1.Product_Name.Rating - e.Product_Name.Rating
            })

            setData2(filter2)
        }).catch((e) => {

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
                    left: container.scrollLeft + step + 30,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft - step - 25,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
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

            <div className='mt-1' >
                {Data2 && <></>}
                <div className=' d-flex flex-row justify-content-between'>

                   
                    <div className=' ml-auto mr-auto d-flex flex-column'>
                    <small className='pww p-2'  >Home & Appliance</small>
                    <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'100px'}}></small>
                  </div>
                    <div className='mr-4'>
                        <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{ fontSize: '15px' }}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2" onClick={() => handleScroll('right')} style={{ fontSize: '15px' }}></i>
                    </div>
                </div>
                <div id='scroll-container' ref={containerRef} className='d-flex flex-row p-2 mt-4' style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {Data2 && Data2.slice().reverse().slice(0, 10).map((e, ind) => {
                          const value=CardData.some((e1)=>{
                            return e1.Product_Name==e.Product_Name.id
                        })
                        return (
                            <>
                                <div style={{ width: '20px', background: 'red', visibility: 'hidden' }}>
                                    ffrtsdfgdsfg
                                </div>
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2   pdis' style={{ height: '275px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px', borderRadius: '10px', borderLeft: 'none', borderRight: 'none', borderTop: '2px solid lightgray' }}>
                                    <LazyLoadImage className='p-3 ml-auto mr-auto zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'175px'} width={'100%'} style={{ cursor: 'pointer', objectFit: 'contain' }} />
                                    <small className='ml-auto mr-auto pwwww  ' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ cursor: 'pointer' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto    ' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ cursor: 'pointer' }}>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text-   ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
                                    </div>
                                    {e.Product_Name.Rating > 0 && <>
                                        <div style={{ position: 'absolute', top: '10px' }}>
                                            <div style={{ width: '50px', height: '30px', background: 'green', borderRadius: '7px' }} className='d-flex flex-row shadow-lg p-1 text-center'>
                                                <p className='text-white'><small>{e.Product_Name.Rating}</small></p><i style={{ fontSize: '15px' }} class=" ml-auto mt-auto mb-auto fa-regular fa-star text-white"></i>
                                            </div>
                                        </div>
                                    </>}
                                    {AddCardIndexs.includes(ind)||value?<>
                                            <div onMouseEnter={()=>{SetBackGround(true)
                                                 SetBackGroundInd(ind)
                                            }}  onMouseLeave={()=>{
                                            
                                                SetBackGround(false)
                                         
                                            }} onClick={() => {navigate('/Addcard')}}  className='card btn d-flex flex-row justify-content-center ml-auto mr-auto' style={{height:'40px',border:'2px solid #1F4C94',backgroundColor:`${BackGround&&(BackGroundInd==ind)?'#1F4C94':'white'}`,cursor:'pointer',width:'100%'}}>
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

            </div>
        </>
    )
}

export default HomeKI