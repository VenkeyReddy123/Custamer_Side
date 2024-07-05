import React, { useEffect, useRef, useState } from 'react'
import Images from './Images'
import Products from './Products'
import Product2 from './Product2'

import Carosels from './Carosels'
import Suggest from './Suggest'
import axios from 'axios'
import { Shop_by  as Shop } from '../Data'
import ArrivalItems from './ArrivalItems'
import { useNavigate } from 'react-router-dom'
import HomeKI from './HomeKI'
import MinDis from './MinDis'
import './PDisplay.css'
import ResizedImage from './ResizedImage'
import ElectronImage from '../Data/Products/elecat.png'
import FashionImage from '../Data/Products/fascat.png'
import FurnitureImage from '../Data/Products/fucan.png'
import { Accesories, Catigories } from '../Data.jsx'
import { Electrinics } from '../Data.jsx'
import { Clothing } from '../Data.jsx'
import { Footware } from '../Data.jsx'
import { Beauty_PersonCare } from '../Data.jsx'
import { Home_Kitchen } from '../Data.jsx'
import { Furniture } from '../Data.jsx'
import { Books_Music } from '../Data.jsx'
import { Toys_Games } from '../Data.jsx'
import { Sports } from '../Data.jsx'
import { Health } from '../Data.jsx'
import DCat from './DCat'
import './Home2.css'

class TruncateWords extends React.Component {
  truncateWords = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
      return truncated + '...';
  };

  render() {
      const { text, maxLength } = this.props;
      const truncatedText = this.truncateWords(text, maxLength);

      return <small >{truncatedText}</small>
  }
}


const HomePage2 = ({HandleRemove,value}) => {
  const [Data2, setData2] = useState(null)
  const [CData,SetCData]=useState([])
  const navigate=useNavigate()
  const [AddCart, SetAdCard] = useState(false)
  const [CanElectro,SetCanElectro]=useState([])
  const [CanFashin2,SetCanFashion2]=useState([])
  const [CanElectro2,SetCanElectro2]=useState([])
  const [CanFashin,SetCanFashion]=useState([])
  const [CanFur,SetCanFur]=useState([])
  const [scrollPosition, setScrollPosition] = useState(0);
   const [scrollPosition2, setScrollPosition2] = useState(0);
   const [scrollPosition3, setScrollPosition3] = useState(0);
    const [step, setStep] = useState(0);
    const [step2, setStep2] = useState(0);
    const containerRef = useRef(null);
    const columnRef = useRef(null);
    const containerRef2 = useRef(null);
    const columnRef2 = useRef(null);
    const containerRef3 = useRef(null);
    const columnRef3 = useRef(null);
    useEffect(()=>{
      axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            const Efilter=d.data.filter((e)=>{
             
              return e.Product_Name.Category=='Electronic'
            }) 
            const randomObjects = [];
            const numObjectsToSelect = 20;

          while(randomObjects.length < numObjectsToSelect && Efilter.length > 0) {
             const randomIndex = Math.floor(Math.random() * Efilter.length);
             randomObjects.push(Efilter.splice(randomIndex, 1)[0]);
          }

            let selectedelectrons=randomObjects
            SetCanElectro(selectedelectrons)
            SetCanElectro2(selectedelectrons.slice(10,selectedelectrons.length))

            const Fasfilter=d.data.filter((e)=>{
             
              return e.Product_Name.Category=='Clothing'
            }) 
            const randomObjects2 = [];
            const numObjectsToSelect2 = 20;

          while(randomObjects2.length < numObjectsToSelect2 &&  Fasfilter.length > 0) {
             const randomIndex2 = Math.floor(Math.random() *  Fasfilter.length);
             randomObjects2.push(Fasfilter.splice(randomIndex2, 1)[0]);
          }


            let selecteFashion=randomObjects2
            SetCanFashion(selecteFashion)
            SetCanFashion2(selecteFashion.slice(11,selecteFashion.length))
            
       
      }).catch((e)=>{

      })



      axios.get('http://127.0.0.1:8000/CuponCodeDetails/',).then((d) => {
   

      const TDate = new Date()
      const Filter = d.data.filter((e) => {
          const EDate = new Date(e.ExpireDate)
          if (TDate.getFullYear() < EDate.getFullYear() ||
              (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() < EDate.getMonth()) ||
              (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() === EDate.getMonth() && TDate.getDate() < EDate.getDate())) {

              return e;
          } else {
              return e.Expired = 'Yes'
          }


      })
      const filter=Filter.map((e)=>{
          if(e.Expired == 'Yes'){
              return 0
          }else{
            return e
          }
      })
      SetCData(filter)
  })
  // window.scrollTo(0, 0)
            
    },[])

  useEffect(() => {
    const container = containerRef.current;
    const column = columnRef.current;
    if (!container || !column) return;

    const containerWidth = container.offsetWidth;
    const colWidth = column.offsetWidth;

    setStep(colWidth);

    

    
    
}, [Shop]);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    if (direction === 'right') {
        if (scrollPosition < Shop.length - 1) {
            container.scrollTo({
                left: container.scrollLeft +150+30,
                behavior: 'smooth',
            });
            setScrollPosition(scrollPosition + 1);
        }
    } else if (direction === 'left') {
        if (scrollPosition > 0) {
            container.scrollTo({
                left: container.scrollLeft -150-30,
                behavior: 'smooth',
            });
            setScrollPosition(scrollPosition - 1);
        }
    }
};





  
  
  return (
    <>
    <div className=''  style={{ overflow: 'hidden',background: '#F5F7FA'}}  >
        <Carosels Value={value}/>
      </div>
    <div>
      <DCat/>
    </div>
      {/* <div onMouseEnter={HandleRemove} className='row mt-2 p-4 justify-content-around'>
  {CData && CData.map((e, index) => {
    if (e === 0) {
   
    } else {
      return (
        <>
         <div class="box col-6 col-md-5 col-lg-4 col-lg-4" style={{height:'150px',}}>
            <div class="coupon-card d-flex flex-column " style={{border:'2px solid gray'}}>
         
            <small className='mt-auto mb-auto ctext'>{e.Code_Name}</small>
      
              <img src={Electrinics} alt="" sizes="" srcset="" style={{height:'100px'}} />
                
                <h6>20% flat off on all rides within the city<br></br>using HDFC Credit Card</h6>
                <di class="coupon-row">
                    <span id="cpnCode">STEALDEAL20</span>
                    <span id="">Copy Code</span>
                </di>
                <p>Valid Till: 20Dec, 2021</p>
                <div class="circle1"></div>
                <div class="circle2"></div>
            </div>
        </div>
        </>
        // <div key={index} className='card col-12 col-sm-6 col-md-4 mt-1 p-2 d-flex flex-row mar' style={{ background: '#FEFFF2', position: 'relative', marginRight: '0px',}}>
        
        //   <small className='uco' style={{ position: 'absolute', top: '-0px', left: '45%', }}><span className='mt-2 mb-2 mr-3 ml-3 text-wa'>useCode</span></small>
        //   <div className='col-8'>
        //     <div className='d-flex flex-row justify-content-end'>
        //       <small className='cof'>{e.Code_Off}</small>
        //       <small className='cof'>{e.Discount_Type.includes('Fixed') ? <><small><i className=" ml-1 fa-solid fa-indian-rupee-sign"></i> Rupess </small></> : <>% Off</>}</small>
        //     </div>
        //     <small className='d-flex flex-row justify-content-end cdes'>{e.description.slice(0, 1).toUpperCase()}{e.description.slice(1).toLowerCase()}</small>
        //     {e.Condtion !== 'All' && <small className='d-flex flex-row justify-content-end ccon'>Only For {e.Condtion}</small>}
        //   </div>
        // </div>

      )
    }
  })}
</div> */}
    
      <div onMouseEnter={HandleRemove} className=' d-flex flex-column mt-5  ' style={{position:'relative',height: '260px', position: 'relative',overflow:'hidden' }} >
      <div className='d-flex flex-row justify-content-between '>
                  <div className=' ml-auto mr-auto d-flex flex-column'>
                  <small className='pww p-2'  >Shop By Category</small>
                  <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'80px'}}></small>
                  </div>
                   <div className='mr-4'>
                   <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{fontSize:'15px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2"  onClick={() => handleScroll('right')} style={{fontSize:'15px'}}></i>
                  </div>
       </div>
                {/* <div className='card-footer d-flex flex-row justify-content-between ' style={{ height: '100px',background:'#F7F7F7' }}>
                  
                </div> */}
                <div id='scroll-container' ref={containerRef} className='d-flex flex-row col-12 mt-4' style={{ overflowX: 'auto',scrollbarWidth:'none' }}>
                    <div className='d-flex flex-row'>
                    {Shop && Shop.map((e) => {
                        return (
                            <>
                            <div  style={{height:'150px',width:'20px',background:'red',visibility:'hidden'}}>
                            ffrtsdfgdsfg
                            </div>
                           
                           <div className='d-flex flex-column'>
                           <div className='card' onClick={()=>{ navigate("/Product",{state:{Cat:e.Name.slice(0,5)}})}}  style={{height:'160px',width:'150px',borderRadius:'10px',boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 2px 10px',cursor:'pointer'}}>
                            <img src="" alt=""  srcset={e.Img} width={'100%'} height={'100%'} style={{borderRadius:'10px'}} />
                            </div>
                            <small className='ml-auto mr-auto mt-3 cnameee pwwwww'>{e.Name}</small>
                           </div>
                              
                            
                                
                            </>
                        )
                    })} 
                    </div>
                </div>



            </div>
            {/* CanEdit Elctro */}

          

            <div className='d-flex flex-row justify-content-between mt-5 '>
                  <div className=' ml-auto mr-auto d-flex flex-column'>
                  <small className='pww p-2'  >Shop On Electronics</small>
                  <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'100px'}}></small>
                  </div>
                   <div className='mr-4' style={{visibility:'hidden'}}>
                   <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{fontSize:'20px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2"  onClick={() => handleScroll('right')} style={{fontSize:'20px'}}></i>
                  </div>
       </div>
          <div className=' d-flex flex-column d-md-flex flex-md-row mt-4   ' >
            <div className='col-md-6 col-lg-5 col-xl-4' height={'350px'} >
              <img className='card' src="" alt="" srcset={ElectronImage} height={'350px'} width={'100%'} style={{borderRadius:'10px'}}/>
                
            </div>

             
            <div className='d-none d-md-block   col-md-6 col-lg-7 col-xl-8   ' style={{height:'350px'}}>

            {/* only lg */}
                <div  className='d-none d-lg-block d-lg-flex d-xl-none flex-lg-row   '>
                 {CanElectro&&CanElectro.slice(0,3).map((e)=>{
                 
                       return(
                        <>
                         
                            <div className='col-3 ml-auto card ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                
                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-lg-block d-lg-flex  d-xl-none flex-lg-row mt-3  '>
                 {CanElectro&&CanElectro.slice(4,7).map((e)=>{
                 
                       return(
                        <>
                            <div className='card col-3 ml-auto' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                 <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                 <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                {/*  */}
                {/* Only Xl */}
                <div  className='d-none d-xl-block d-xl-flex   flex-xl-row   ' style={{}}>
                 {CanElectro&&CanElectro.slice(0,5).map((e)=>{
                 
                       return(
                        <>
                         
                            <div className='col-2 ml-auto mr-auto card  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-xl-block d-xl-flex   flex-xl-row mt-3     '>
                 {CanElectro&&CanElectro.slice(4,9).map((e)=>{
                 
                       return(
                        <>
                            <div className='col-2 ml-auto mr-auto card  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>

                {/*  */}
                 {/* Only medium */}
                 <div className='d-none d-md-block d-lg-none d-md-flex flex-md-row   '>
                 {CanElectro&&CanElectro.slice(0,2).map((e)=>{
                 
                       return(
                        <>
                            <div className=' col-5 ml-auto  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                            <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />     
                            <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small> 

                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-md-block d-lg-none d-md-flex  flex-md-row mt-3  '>
                 {CanElectro&&CanElectro.slice(0,2).map((e)=>{
                 
                       return(
                        <>
                            <div className='m col-5 ml-auto' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                            <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                            <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                {/*  */}
          </div>
         
          

      </div>
      {/* belowele */}

      <div className='mt-4   ml-auto d-none d-sm-block d-sm-flex flex-sm-row col-12 ' >
          <div className='col-12 d-flex flex-row justify-content-end ' style={{background:'#F17E3A',height:'180px',marginTop:'0px',borderRadius:'5px',boxShadow:'box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;'}}>
         <div className='mr-auto ml-auto mt-auto mb-auto'>
             <button onClick={() => {
                                   
                                   navigate("/Product", { state: {Cat:'Electronic' } })
                               }} className='btn btn-primary pw' >View All</button>
         </div>
          {CanElectro2&&CanElectro2.slice(4,7).map((e)=>{
            return(
              <>
                  <div   className=' mr-1 col-5 col-sm-3 col-md-3 col-lg-2  mt-auto mb-auto  ml-1 card  ' style={{height:'165px',background:'white',borderRadius:'10px',}}>
                                <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1 ml-auto mr-auto' src="" width={'90%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                  </div>
              </>
            )
         })}  
          </div>
          
      </div>
      <div className='mt-4   ml-auto d-block d-sm-none container d-flex flex-row justify-content-center  ' >
          <div className=' col-12  row justify-content-around' style={{background:'#F17E3A',height:'395px',borderRadius:'5px'}}>
        
          {CanElectro2&&CanElectro2.slice(4,8).map((e)=>{
            return(
              <>
                  <div ref={columnRef2}  className=' mr-1 col-5 col-sm-3 col-md-3 col-lg-2  mt-auto mb-auto  ml-1 card  ' style={{height:'165px',background:'white',borderRadius:'10px'}}>
                                <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1 ml-auto mr-auto' src="" width={'90%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                  </div>
              </>
            )
         })}  
          <div className='mr-2 ml-auto mt-auto mb-auto'>
             <button onClick={() => {
                                   
                                   navigate("/Product", { state: {Cat: 'Electronic' } })
                               }} className='btn btn-primary pw' >View All</button>
         </div>
          </div>
          
      </div>
    {/* Fashin */}
    <div className='d-flex flex-row justify-content-between mt-5 '>
                  
                  <div className=' ml-auto mr-auto d-flex flex-column'>
                  <small className='pww p-2'  >Find Your Style</small>
                  <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'80px'}}></small>
                  </div>
                   <div className='mr-4' style={{visibility:'hidden'}}>
                   <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{fontSize:'20px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2"  onClick={() => handleScroll('right')} style={{fontSize:'20px'}}></i>
                  </div>
       </div>
     
     <div className='d-flex flex-column d-md-flex flex-md-row mt-4 ' >
            <div className='col-12 d-flex flex-row  col-md-6 col-lg-5 col-xl-4' height={'350px'} >
              <img  src="" alt="" className='card ml-auto mr-auto' srcset={FashionImage} height={'350px'} width={'100%'} style={{borderRadius:'10px'}}/>
                
            </div>

             
            <div className='d-none d-md-block   col-md-6 col-lg-7 col-xl-8   ' style={{height:'350px'}}>

            {/* only lg */}
                <div  className='d-none d-lg-block d-lg-flex d-xl-none flex-lg-row   '>
                 {CanFashin&&CanFashin.slice(0,3).map((e)=>{
                 
                       return(
                        <>
                         
                            <div className='col-3 ml-auto card ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-lg-block d-lg-flex  d-xl-none flex-lg-row mt-3 j  '>
                 {CanFashin&&CanFashin.slice(4,7).map((e)=>{
                 
                       return(
                        <>
                            <div className='card col-3 ml-auto' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                 <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                 <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                {/*  */}
                {/* Only Xl */}
                <div  className='d-none d-xl-block d-xl-flex   flex-xl-row   ' style={{}}>
                 {CanFashin&&CanFashin.slice(0,5).map((e)=>{
                 
                       return(
                        <>
                         
                            <div className='col-2 ml-auto mr-auto card  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-xl-block d-xl-flex   flex-xl-row mt-3     '>
                 {CanFashin&&CanFashin.slice(4,9).map((e)=>{
                 
                       return(
                        <>
                            <div className='col-2 ml-auto mr-auto card  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                            </div>
                        </>
                       )
                    })}
                </div>

                {/*  */}
                 {/* Only medium */}
                 <div className='d-none d-md-block d-lg-none d-md-flex flex-md-row   '>
                 {CanFashin&&CanFashin.slice(0,2).map((e)=>{
                 
                       return(
                        <>
                            <div className=' col-5 ml-auto  ' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                            <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />  
                            <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>    

                            </div>
                        </>
                       )
                    })}
                </div>
                <div className='d-none d-md-block d-lg-none d-md-flex  flex-md-row mt-3  '>
                 {CanFashin&&CanFashin.slice(0,2).map((e)=>{
                 
                       return(
                        <>
                            <div className='m col-5 ml-auto' style={{height:'165px',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                            <img  onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                            </div>
                        </>
                       )
                    })}
                </div>
                {/*  */}
          </div>
         
          

      </div>
      {/* belowele */}

      <div className='mt-4  ml-auto d-none d-sm-block d-sm-flex flex-sm-row col-12 ' >
          <div className='col-12 d-flex flex-row justify-content-end ' style={{backgroundColor:'lightblue',height:'180px',marginTop:'0px',borderRadius:'5px'}}>
         <div className='mr-auto ml-auto mt-auto mb-auto'>
             <button onClick={() => {
                                   
                                   navigate("/Product", { state: {Cat:'Clothing' } })
                               }} className='btn btn-primary pw' >View All</button>
         </div>
          {CanFashin&&CanFashin.slice(10,13).map((e)=>{
            return(
              <>
                  <div   className=' mr-1 col-5 col-sm-3 col-md-3 col-lg-2 col-xl-  mt-auto mb-auto  ml-1 card  ' style={{height:'165px',background:'white',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1 ml-auto mr-auto' src="" width={'100%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                 <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                  </div>
              </>
            )
         })}  
          </div>
          
      </div>
      <div className='mt-3   ml-auto d-block d-sm-none container d-flex flex-row justify-content-center  ' >
          <div className=' col-12  row justify-content-around' style={{backgroundColor:'lightblue',height:'395px',borderRadius:'5px'}}>
        
          {CanFashin&&CanFashin.slice(4,8).map((e)=>{
            return(
              <>
                  <div ref={columnRef2}  className=' mr-1 col-5 col-sm-3 col-md-3 col-lg-2  mt-auto mb-auto  ml-1 card  ' style={{height:'165px',background:'white',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',borderLeft:'none',borderTop:'none'}}>
                                <img onClick={() => { navigate('/Dis', { state: { data: e } }) }} className='mt-1 ml-auto mr-auto' src="" width={'90%'} height={'65%'} alt="" srcset={e.ImageUrl} style={{objectFit:'contain',cursor:'pointer'}} />
                                <small className='ml-auto mr-auto mt-auto mb-auto pwwww'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                  </div>
              </>
            )
         })}  
          <div className='mr-2 ml-auto mt-auto mb-auto'>
             <button onClick={() => {
                                   
                                   navigate("/Product", { state: {Cat: 'Clothing' } })
                               }} className='btn btn-primary pw' >View All</button>
         </div>
          </div>
          
      </div>
     {/* Belowele */}      

      
         

      <div className=' mt-5      ' style={{background:'white',overflow:'hidden',borderBottom:'1px solid lightgray'}}>
        <Products />
      </div>
      <div className=' mt-5   ' style={{background:'white',overflow:'hidden',borderBottom:'1px solid lightgray'}}>
        <Product2 />
      </div>
      <div className=' mt-5  ' style={{background:'white',overflow:'hidden',borderBottom:'1px solid lightgray'}}>
        <HomeKI />
      </div>
      <div className='mt-5' style={{ overflow: 'hidden' }} >
                <ArrivalItems />
       </div>
      {/* <div className=' mt-  ' style={{background:'white',overflow:'hidden'}}>
        <h6 className='ml-1' style={{borderBottom:'1px solid lightgray',width:'100%',display:'inline-block'}}>Suggested for You</h6>
          <Suggest/>
      </div> */}
      {/* <div className=' mt-3 mb-5 p-2  ml-2 mr-2  ' style={{background:'white',overflow:'hidden'}}>
          <MinDis/>
      </div> */}
      {AddCart && <>
                <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '60vh' }}>
                    <div className='  col-10 col-sm-7 col-md-3 bg-danger p-2' style={{ borderRadius: '10px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetAdCard(false)

                            }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                        </div>
                        <span className='text-white'>Added Successlly</span>
                    </div>
                </div>
            </>}
    </>
  )
}

export default HomePage2

// const AddCartFunc2 = () => {
//   AddCartFunc()
//   }
// useEffect(() => {
//     axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
      
          


//     }).catch((e) => {
//         alert('Please Try AGian Later Somthing Eroor')
//     })

// }, [])
