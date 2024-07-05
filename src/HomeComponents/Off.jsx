import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span style={{ color: 'gray', fontFamily: 'monospace' }}>{truncatedText}</span>;
    }
}

const Off = () => {
    const navigate = useNavigate()
    const [Data, setData] = useState(null)
    const [Data2,setData2]=useState([])



    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
          const filter=d.data.filter((e)=>{
            return e.Product_Name.Category_Name.toLowerCase().includes('Dress'.toLowerCase())
          })
          const filter2=d.data.filter((e)=>{
              return e.Product_Name.Category_Name.toLowerCase().includes('T-shi'.toLowerCase())||  e.Product_Name.Category_Name.toLowerCase().includes('Shirts'.toLowerCase())
          })
          setData(filter)
          setData2(filter2)

        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
  return (
   <>
      <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row  mb-3 ' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
         
                <div className='col-10 col-md-5 mr-1 mt-1 d-flex flex-column p-4 shadow-lg ml-auto mr-auto  ' style={{ height: '650px', background: 'white' }} >
                     <h3>Shop For Men Style's</h3>
                    <div className='d-flex flex-row justify-content-between ' style={{height:'50%',width:'100%'}}>
                        {Data2&&Data2.slice().reverse().slice(0,2).map((e)=>{
                            return(
                                <>
                                <div className='card mt-2 one d-flex flex-row justify-content-center' style={{position:'relative'}}  >
                                   <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer'   }} />
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'15px',cursor:'pointer'}}><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'0px',cursor:'pointer'}}><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                </div>
                                </>
                            )
                        })}
                    </div>
                    <div className='d-flex flex-row justify-content-between' style={{height:'50%',width:'100%'}}>
                        {Data2&&Data2.slice().reverse().slice(2,4).map((e)=>{
                            return(
                                <>
                                <div className='card  mt-2 one d-flex flex-row justify-content-center'  >
                                <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer',  }} />  
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'15px' ,cursor:'pointer'}}><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'0px' ,cursor:'pointer'}}><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                </div>
                                </>
                            )
                        })}
                    </div> 
                </div>
                <div className='col-10 col-md-5 mr-1 mt-1 d-flex flex-column p-4 shadow-lg ml-auto mr-auto  ' style={{ height: '650px', background: 'white' }} >
                     <h3>Shop For Women Style's</h3>
                    <div className='d-flex flex-row justify-content-between ' style={{height:'50%',width:'100%'}}>
                        {Data&&Data.slice().reverse().slice(1,3).map((e)=>{
                            return(
                                <>
                                <div className='card mt-2 one d-flex flex-row justify-content-center' style={{position:'relative'}}  >
                                   <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer'   }} />
                                  
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'15px' ,cursor:'pointer'}}> <TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'0px' ,cursor:'pointer'}}><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                </div>
                                </>
                            )
                        })}
                    </div>
                    <div className='d-flex flex-row justify-content-between' style={{height:'50%',width:'100%'}}>
                        {Data&&Data.slice().reverse().slice(2,5).map((e)=>{
                            return(
                                <>
                                <div className='card  mt-2 one d-flex flex-row justify-content-center'  >
                                <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer',  }} />  
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'15px',cursor:'pointer'}}> <TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{position:'absolute',bottom:'0px' ,cursor:'pointer'}}><i class="fa-solid fa-indian-rupee-sign"></i>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}</small>
                                </div>
                                </>
                            )
                        })}
                    </div> 
                </div>
                </div>
   </>
  )
}

export default Off