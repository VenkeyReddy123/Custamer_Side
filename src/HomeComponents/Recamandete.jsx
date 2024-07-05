import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Nav.css'

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

const Recamandete = () => {
    const navigate=useNavigate()
    const [index, setIndex] = useState(null)
    const [index2, setIndex2] = useState(null)
    const [index3, setIndex3] = useState(null)
    const [Data2, setData2] = useState(null)
    const [isHovered, setIsHovered] = useState(false);
    const [LPop, setLPop] = useState(false)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
           const filter=d.data.filter((e)=>{
            return e.Product_Name.Category_Name.toLowerCase().includes('Sand'.toLowerCase())
           })
           setData2(filter)
  
  
        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })
  
    }, [])
    const AddCard=(e)=>{
        const email=localStorage.getItem('email')?localStorage.getItem('email'):false
        if(email){
              const Data={
        
            "Custamer_Name":email,
            "Product_Name":e.Product_Name.id
        }
         axios.post("http://127.0.0.1:8000/AddCardDetails/",Data).then((e)=>{
            window.location.reload()
         }).catch((e)=>{
            window.location.reload()
         })
            return
        }
        else{
            setLPop(true)
        }
        return
    
    }

  
  return (
   <> 
      <div style={{ overflow: 'hidden', position: 'relative' }}>
       <div className=' col-12 d-flex flex-row justify-content-between'>
             <div className=' col-12 d-flex flex-column'>
                   <h6>Recommendate Sandals for Summer</h6>
                    <div style={{ width: '100%', borderBottom: '3px solid lightgray' }}>

                    </div>
             </div>
        </div>
       {/* <div className='col-lg-12 mt-4 ml-1 d-flex flex-row' style={{overflowX:'auto',scrollbarWidth:'none'}}>
       
                {Data2 && Data2.slice(0, 6).map((e, ind) => {
                    return (
                        <>
                            <div   className='bg-white col-7 col-md-4 text-center' onMouseEnter={() => { setIndex(ind) }} onMouseLeave={() => { setIsHovered(!isHovered) }} style={{ borderRight: '2px solid black',cursor:'pointer' }} >
                                <div onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='p-2' style={{ height: '190px', overflow: 'hidden' }}>
                                    <img src={e.ImageUrl} alt="" height={'100%'} />
                                </div>
                                <div className='' style={{ height: '150px' }}>
                                    {e.Product_Name.Rating>0&&<><span className='text-warning' style={{ textAlign: 'start' }}><StarRating rating={Number(e.Product_Name.Rating)} /></span><br></br></>}
                                    <span style={{ textAlign: 'start' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={30} /></span><br></br>
                                    <i class="fa-solid fa-indian-rupee-sign  text-success ml-2 mt- mb-auto"></i>  <small className='text-success'>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                    {index === ind ? (<>
                                        <div className='d-flex flex-row justify-content-center  col-12 '>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
                                                <i onClick={() => { AddCard(e)}}  style={{ fontSize: '25px' }} class="fa-solid fa-cart-shopping  text-dark "></i>
                                            </div>
                                            <div className='p-1 btn btn-primary mr-auto ml-auto  '>
                                                <i onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ fontSize: '25px' }} class="fa-solid fa-eye  text-dark"></i>
                                            </div>
                                        </div>
                                    </>) : (<></>)}
                                </div>

                            </div>
                        </>
                    )
                })}
        </div> */}
         <div className=' d-sm-flex flex-sm-column d-md-flex flex-md-row justify-content-around p-2 mt-2  ' style={{ overflow: 'hidden', scrollbarWidth: 'none' }}>
                <div className='col-12 card col-md-6 col-lg-5   d-flex flex-row mt-2 mr-1  shadow' style={{ height: '350px', }}>
                    <div className='mt-4' style={{ width: '50%', height: '100%', }}>
                        <div className='p-2  ' style={{}}>
                            {Data2 && Data2.slice().reverse().slice(0, 1).map((e, index) => {
                                return (
                                    <div key={index} className='p-2 d-flex flex-column justify-content-center' style={{ height: '140%', width: '90%', }}>
                                        <LazyLoadImage className='p-3 zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'90%'} width={'100%'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                        <small className=' ml-auto mr-auto mt-auto mb-auto '  onClick={() => { navigate('/Dis', { state: { data: e } }) }}  style={{ cursor: 'pointer'}} ><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    <div style={{ border: '1px solid lightgray' }}>

                    </div>
                    <div className='d-flex flex-column p-1' style={{ width: '50%', height: '100%', textAlign: 'center' }}>
                        {Data2 && Data2.slice().reverse().slice(1, 3).map((e, index) => {
                            return (
                                <div key={index} className='p-2 d-flex flex-column justify-content-center ' style={{ height: '50%', width: '100%',borderBottom:`${index==0?'2px solid lightgray':''}` }}>
                                    <LazyLoadImage className='p-2 zoom-effect ' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'95%'} width={'auto'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                    <small onClick={() => { navigate('/Dis', { state: { data: e } }) }}  style={{ cursor: 'pointer'}} className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                </div>

                            )
                        })}
                    </div>
                </div>

                {/*  */}
                <div className='col-12 card col-md-6  col-lg-5 shadow   d-flex flex-row mt-2  ' style={{ height: '350px', }}>
                <div className='mt-4' style={{ width: '50%', height: '100%', }}>
                        <div className='p-2 ' style={{}}>
                            {Data2 && Data2.slice().reverse().slice(3, 4).map((e, index) => {
                                return (
                                    <div key={index} className='p-2 d-flex flex-column justify-content-center' style={{ height: '140%', width: '90%', }}>
                                        <LazyLoadImage className='p-2 zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'100%'} width={'100%'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                        <small onClick={() => { navigate('/Dis', { state: { data: e } }) }}  style={{ cursor: 'pointer'}} className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    <div style={{ border: '1px solid lightgray' }}>

                    </div>
                    <div className='d-flex flex-column p-1 ' style={{ width: '50%', height: '100%', textAlign: 'center', }}>
                        {Data2 && Data2.slice().reverse().slice(4, 6).map((e, index) => {
                            return (
                                <div key={index} className='p-2 d-flex flex-column justify-content-center' style={{ height: '50%', width: '90%',borderBottom:`${index==0?'2px solid lightgray':''}` }}>
                                    <LazyLoadImage className='p-2 zoom-effect' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'95%'} width={'auto'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                    <small onClick={() => { navigate('/Dis', { state: { data: e } }) }}  style={{ cursor: 'pointer'}} className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                </div>

                            )
                        })}
                    </div>
                </div>

            </div>


        {LPop && <>
                    <div className='d-flex flex-row justify-content-end bg-danger p-2 ' style={{ position: 'absolute', top: '20%', right: '20px',borderRadius:'10px' }}>
                    
                            <small className='mr-3 text-light'>Please Login</small>
                        
                        <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                            setLPop(false)
                        }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>


                    </div>
                </>}
        </div>
   </>
  )
}

export default Recamandete