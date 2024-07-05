import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
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

    return <span>{truncatedText}</span>;
  }
}

const Electronic = () => {
  const [Data2, setData2] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
    
      const filter=d.data.filter((e)=>{
        return e.Product_Name.Category.includes('Spo')
      })
      setData2(filter.slice().reverse())
     
    }).catch((e) => {
      
    })

  }, [])
  return (
    <>
      <div style={{ overflowX: 'hidden', }} className='col-11'>
        <h5 className='text-wrap card-body p-4' style={{fontFamily:'monospace'}}>Sports Deals</h5>
      </div>
      <div className='row' style={{ overflow: 'hidden', }}>
        {Data2 && Data2.slice(0,4).map((e, index) => {
          return (
           <>
               <div className='card d-flex flex-row justify-content-center p-3 col-5 mt-1 col-md-3  col-lg-2 ml-auto mr-auto' style={{height:'250px',position:'relative'}}>
               <LazyLoadImage className=' zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer' }} />   
               <small className=' ml-auto mr-auto mt-auto mb-auto text-success text2'  onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{ position: 'absolute', bottom: '10px',cursor:'pointer' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={20} /></small>

               </div>
           </>
          )
        })}
      </div>

    </>
  )
}

export default Electronic