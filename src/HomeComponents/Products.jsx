import React, { useEffect, useRef, useState } from 'react'
import { Mobile_Data } from '../Data/Mobile_Data'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Img1 from './Assets/heart.svg'
import ResizedImage from './ResizedImage';
import './Producsts.css'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

        return <small >{truncatedText}</small>;
    }
}

const Products = () => {
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
    const [SizeData,SetSizeData]=useState([])
    const [SizePop,SetSizePop]=useState(false)
    const [SelectedSize,SetSelectedSize]=useState(null)
    const[SaveInd,setSaveInd]=useState(null)
    
    useEffect(() => {
        if(localStorage.getItem('email')){
            axios.get("http://127.0.0.1:8000/AddCardDetails/").then((d)=>{
               
                 const filter=d.data.filter((e)=>{
                    return e.Custamer_Name.Email==localStorage.getItem('email')
                 })
               
                 SetCardData(filter)
            })
        }
        axios.get("http://127.0.0.1:8000/TopDealsDetails/").then((d) => {

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
    // const AddCard = (e,index) => {
    //     // if(!SelectedSize&&(e.Product_Name.Category=='Footware'||e.Product_Name.Category=='Clothing')){
    //     //        SetSizePop(true)       
    //     //        SetSizeData(e)
    //     //        return
    //     // }
        

    //     const email = localStorage.getItem('email') ? true : false
    //     if (email) {
    //         const Data = {
    //             "Custamer_Name": localStorage.getItem('email'),
    //             "Product_Name": e.Product_Name.id,
    //             "Size":SelectedSize==null?'No':SelectedSize
    //         }
    //         axios.post("http://127.0.0.1:8000/AddCardDetails/", Data).then((e) => {
    //            const filter=[...AddCardIndexs,index]
                 
              
    //             SetAddCardIndexs(filter)
             
    //         }).catch((e) => {
                
    //         })
    //         return
    //     }
    //     else {
    //         setLPop(true)
    //     }
    //     return

    // }
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
                <div className='d-flex flex-row justify-content-between'>
                    <div className=' ml-auto mr-auto d-flex flex-column'>
                   <small className='pww p-2'  >Top Deals</small>
                    <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'40px'}}></small>
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
                                <div ref={columnRef} className='card col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2  pdis ' style={{ height: '275px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px', borderRadius: '10px', borderLeft: 'none', borderRight: 'none', borderTop: '2px solid lightgray', }}>
                                    <LazyLoadImage className=' p-3 ml-auto mr-auto zoom-effect ' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'160px'} width={'100%'} style={{ cursor: 'pointer', objectFit: 'contain' }} />

                                    <small className='ml-auto mr-auto pwwww mt-auto mb-auto ' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    <div className='d-flex flex-row ml-auto mr-auto mt-auto mb-auto  ' style={{ cursor: 'pointer' }} onClick={() => { navigate('/Dis', { state: { data: e } }) }}>
                                        <small className='text-success'><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                        <small className='text-  ml-1'><del><i class="fa-solid fa-indian-rupee-sign "></i>{e.Product_Name.Price}</del></small >
                                    </div>
                                    {AddCardIndexs.includes(ind)||value?<>
                                            <div  onMouseEnter={()=>{SetBackGround(true)
                                                 SetBackGroundInd(ind)
                                            }}  onMouseLeave={()=>{
                                            
                                                SetBackGround(false)
                                         
                                            }} onClick={() => {navigate('/Addcard')}}  className='card btn d-flex flex-row justify-content-center ml-auto mr-auto mt-auto mb-auto' style={{height:'40px',border:'2px solid #1F4C94',backgroundColor:`${BackGround&&(BackGroundInd==ind)?'#1F4C94':'white'}`,cursor:'pointer',width:'100%'}}>
                                               <span  className='mt-auto mb-auto pw' style={{color:`${BackGround&&(BackGroundInd==ind)?'white':'gray'}`,cursor:'pointer',fontSize:'13px'}}>Go To  Cart</span>  
                                            </div>
                                           </>:<>
                                           <div onMouseEnter={()=>{SetBackGround(true)
                                                 SetBackGroundInd(ind)
                                            }}  onMouseLeave={()=>{
                                            
                                                SetBackGround(false)
                                         
                                            }} onClick={()=>{
                                                setSaveInd(ind)
                                                AddCard(e,ind)
                                                
                                            }}  className='card btn d-flex flex-row justify-content-center mt-auto mb-auto' style={{height:'40px',border:'2px solid orange',backgroundColor:`${BackGround&&(BackGroundInd==ind)?'orange':'white'}`,cursor:'pointer'}}>
                                               <span  className='mt-auto mb-auto pw' style={{color:`${BackGround&&(BackGroundInd==ind)?'white':'orange'}`,cursor:'pointer',fontSize:'13px'}}>Add  Cart</span>  
                                            </div>
                                           </>}
                                </div>

                            </>
                        )
                    })}
                </div>


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
                                <span className='text-danger  pw'>Please Select Size Of The Product</span>
                                {SizeData.Product_Name.Size_Of_Product =='No' ? <></> : <>
                                    <div className='d-flex flex-row justify-content-between mt-4'>
                                        <div className='col-4 col-sm-1 '>
                                            <span className='h6 text-secondary'>Sizes</span>
                                        </div>
                                        <div className='row col-8 col-sm-11 row justify-content-start ' style={{ rowGap: '20px', columnGap: '10px' }}>
                                            {SizeData.Product_Name.Size_Of_Product.split('#').map((e) => {
                                                if (e == 'No') {

                                                } else {
                                                    return (
                                                        <>
                                                          
                                                            <div className='d-flex flex-row '>
                                                                <input onChange={()=>{SetSelectedSize(e)}}  type="radio" name="rr" id="" /><div className='card ml-2' style={{width:'50px',height:'35px',background:'white',textAlign:'center', background:'#1F4C94',color:'white',boxShadow:'0px 0px 5px rgba(0, 0, 0, 0.3)'}}><span className='mt-auto mb-auto'>{e}</span></div>
                                                            </div>
                                                          
                                                        </>
                                                    )
                                                }
                                            })}

                                        </div>
                                      
                                    </div>
                                </>}
                                <div className='d-flex flex-row'>
                                <button className={`btn btn-primary ml-auto ${SelectedSize==null&&'disabled'} `} onClick={()=>{
                                   if(SelectedSize==null){
                                       
                                   }else{
                                    AddCard(SizeData,SaveInd)
                                    SetSizePop(false)
                                   }
                                }}>Add</button>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {  SetSizePop(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }


        </>
    )
}

export default Products;
