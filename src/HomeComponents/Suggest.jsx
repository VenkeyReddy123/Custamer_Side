
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


const Suggest = () => {
    const navigate = useNavigate()
    const [Data2, setData2] = useState(null)

    const maxLengthSmallScreen = 10;
    const maxLengthLargeScreen = 20;


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/SuggestDetails/").then((d) => {
            setData2(d.data)


        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    return (
        <>
            <div className=' d-sm-flex flex-sm-column d-md-flex flex-md-row   ' style={{ overflow: 'hidden', scrollbarWidth: 'none' }}>
                <div className='col-12 card col-md-6   d-flex flex-row mt-2 mr-1 ' style={{ height: '350px', }}>
                    <div className='mt-4' style={{ width: '50%', height: '100%', }}>
                        <div className='p-2  ' style={{}}>
                            {Data2 && Data2.slice().reverse().slice(0, 1).map((e, index) => {
                                return (
                                    <div key={index} className='p-2 d-flex flex-column justify-content-center' style={{ height: '140%', width: '90%', }}>
                                        <LazyLoadImage className='p-2 zoom-effect' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'100%'} width={'100%'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                        <small className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
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
                                    <LazyLoadImage className='p-2 zoom-effect ' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'95%'} width={'auto'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                    <small className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                </div>

                            )
                        })}
                    </div>
                </div>

                {/*  */}
                <div className='col-12 card col-md-6     d-flex flex-row mt-2  ' style={{ height: '350px', }}>
                <div className='mt-4' style={{ width: '50%', height: '100%', }}>
                        <div className='p-2 ' style={{}}>
                            {Data2 && Data2.slice().reverse().slice(3, 4).map((e, index) => {
                                return (
                                    <div key={index} className='p-2 d-flex flex-column justify-content-center' style={{ height: '140%', width: '90%', }}>
                                        <LazyLoadImage className='p-2 zoom-effect' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'100%'} width={'100%'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                        <small className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
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
                                    <LazyLoadImage className='p-2 zoom-effect' src={e.ImageUrl.ImageUrl} onClick={() => { navigate('/Dis', { state: { data: e } }) }} alt="Description of the image" effect="blur" height={'95%'} width={'auto'} style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
                                    <small className=' ml-auto mr-auto mt-auto mb-auto'><TruncateWords text={e.Product_Name.Product_Name} maxLength={15} /></small>
                                </div>

                            )
                        })}
                    </div>
                </div>

            </div>


        </>
    )
}

export default Suggest