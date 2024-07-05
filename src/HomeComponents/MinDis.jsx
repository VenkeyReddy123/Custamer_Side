
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


const MinDis = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)




    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            const filter = d.data.filter((e) => {
                return e.Product_Name.Discount > 50
            })
            setData2(filter.sort((e,e1)=>{return e.Product_Name.Discount - e1.Product_Name.Discount}))


        }).catch((e) => {

        })

    }, [])
    return (
        <>
            <h6>Min 50%  Discount For You</h6>
            <div className='d-sm-flex flex-sm-column d-md-flex flex-md-row ' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <div className='col-12 col-md-6 mr-1 mt-1 d-flex flex-column p-4 shadow   ' style={{ height: '450px', background: 'white' }} >
                    <div className='d-flex flex-row justify-content-between ' style={{height:'50%',width:'100%'}}>
                        {Data2&&Data2.slice().reverse().slice(0,2).map((e)=>{
                            return(
                                <>
                                <div className='card mt-2 one d-flex flex-row justify-content-center' style={{position:'relative'}}  >
                                   <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer'   }} />
                                  
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' style={{position:'absolute',bottom:'0px'}}> Off {e.Product_Name.Discount}%</small>
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
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' style={{position:'absolute',bottom:'0px'}}> Off {e.Product_Name.Discount}%</small>
                                </div>
                                </>
                            )
                        })}
                    </div> 
                </div>
                <div className='col-12 col-md-6 mr-1 mt-1 d-flex flex-column p-4  shadow  ' style={{ height: '450px', background: 'white' }} >
                    <div className='d-flex flex-row justify-content-between ' style={{height:'50%',width:'100%'}}>
                        {Data2&&Data2.slice().reverse().slice(4,6).map((e)=>{
                            return(
                                <>
                                <div className='card mt-2 one d-flex flex-row justify-content-center ' style={{position:'relative',}}  >
                                   <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer'   }} />
                                   <small className=' ml-auto mr-auto mt-auto mb-auto text-success' style={{position:'absolute',bottom:'0px'}}> Off {e.Product_Name.Discount}%</small>
                                </div>
                                </>
                            )
                        })}
                    </div>
                    <div className='d-flex flex-row justify-content-between' style={{height:'50%',width:'100%'}}>
                        {Data2&&Data2.slice().reverse().slice(6,8).map((e)=>{
                            return(
                                <>
                                <div className='card  mt-2 one d-flex flex-row justify-content-center'  >
                                <LazyLoadImage className='p-2 zoom-effect img1' src={e.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'auto'} width={'auto'} style={{ cursor: 'pointer',  }} />  
                                <small className=' ml-auto mr-auto mt-auto mb-auto text-success' style={{position:'absolute',bottom:'0px'}}> Off {e.Product_Name.Discount}%</small>
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

export default MinDis