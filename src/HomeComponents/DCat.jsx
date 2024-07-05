import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Audio from '../Data/Products/adcat.png'
import Dress from '../Data/Products/dresscat.png'
import Home from '../Data/Products/hkcat.png'
import Mobile from '../Data/Products/MCat3.png'
import Sports from '../Data/Products/scat.png'
import Telivision from '../Data/Products/tcat.png'
import Games from '../Data/Products/tgcat.png'
import Laptop from '../Data/Products/lcat.png'


const DCat = () => {
    const navigate = useNavigate()
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;
    
        if (direction === 'right') {
            if (scrollPosition < List.length - 1) {
                container.scrollTo({
                    left: container.scrollLeft +130+30,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition + 1);
            }
        } else if (direction === 'left') {
            if (scrollPosition > 0) {
                container.scrollTo({
                    left: container.scrollLeft -130-30,
                    behavior: 'smooth',
                });
                setScrollPosition(scrollPosition - 1);
            }
        }
    };
    
    const List = [
        {
            'Name': "Mobiles",
            "Img": Mobile,
            "navigate": '/List',
            "Cat_Name": 'Mobiles',
            "Cat": 'Electrinics'
        },
        {
            'Name': "Televisions",
            "Img": Telivision,
            "navigate": '/List',
            "Cat_Name": 'Telivision',
            "Cat": 'Electrinics'
        },

        {
            'Name': "Sports",
            "Img": Sports,
            "navigate": '/Product',
            "Cat_Name": '',
            "Cat": 'Sports'
        },


        {
            'Name': "Games",
            "Img": Games,
            "navigate": '/Product',
            "Cat_Name": '',
            "Cat": 'Toys'
        },

        {
            'Name': "Audio",
            "Img": Audio,
            "navigate": '/List',
            "Cat_Name": 'Audio',
            "Cat": 'Electrinics'
        },


        {
            'Name': "Laptops",
            "Img": Laptop,
            "navigate": '/List',
            "Cat_Name": 'Laptops',
            "Cat": 'Electrinics'
        },

        {
            'Name': "Dresses",
            "Img": Dress,
            "navigate": '/List',
            "Cat_Name": 'Dresses',
            "Cat": 'Clothing'
        },
        {
            'Name': "Home & Kitchen",
            "Img": Home,
            "navigate": '/Product',
            "Cat_Name": '',
            "Cat": 'Home'
        },

    ]


    return (
        <>
            <div className='d-flex flex-row justify-content-between  mt-5'>
               
                <div className=' ml-auto mr-auto d-flex flex-column'>
                  <small className='pww p-2'  >Select Your Favorite</small>
                  <small className='ml-auto mr-auto' style={{borderBottom:'2px solid lightskyblue',width:'100px'}}></small>
                  </div>
                  
                   <div className='mr-4'>
                   {/* <small className='btn btn-primary  mr-3' onClick={() => handleScroll('left')} style={{height:'30px',width:'30px'}}><i class="fa-solid fa-angles-left"></i></small>
                        <span className='btn btn- ml-2' onClick={() => handleScroll('right')} style={{background:'lightgray '}} ><i class="fa-solid fa-angles-right"></i></span> */}
                        <i class="fa-solid fa-angles-left text-warning p-1 card mr-2" onClick={() => handleScroll('left')} style={{fontSize:'15px'}}></i>
                        <i class="fa-solid fa-angles-right text-info  p-1 card ml-2"  onClick={() => handleScroll('right')} style={{fontSize:'15px'}}></i>
                  </div>
       </div>
            <div ref={containerRef} className='col-12 d-flex flex-row mt-4  ' style={{ overflow: 'auto', scrollbarWidth: 'none' }}>

                {List && List.map((e) => {
                    return (
                        <>
                            <div style={{ width: '15px' }}>

                            </div>
                            <div className='d-flex flex-column  '>
                                <div onClick={() => {
                                    navigate(e.navigate, { state: { Cat_Name:e.Cat_Name, Cat: e.Cat } })
                                }} className='card ml-3' style={{ width: '130px', height: '150px', cursor: 'pointer', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 2px 10px' }}>
                                    <img src="" alt="" srcset={e.Img} style={{ width: '100%', height: '102%', objectFit: 'contain', borderRadius: '10px' }} />
                                </div>
                                <small style={{}} className=' ml-auto mr-auto mt-3 cnameee'>{e.Name}</small>
                            </div>
                            <div style={{ width: '15px' }}>

                            </div>
                        </>
                    )
                })}

            </div>
        </>
    )

}
export default DCat