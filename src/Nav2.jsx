import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../src/HomeComponents/Assets/css.png'
import ResizedImage from './HomeComponents/ResizedImage'
import axios from 'axios'
import './Dsidebar.css'

const Nav2 = ({HanldeAutoComplete}) => {
    const navigate=useNavigate()
    const [send,setSend]=useState('')
    const [Data,setData]=useState([])
   
    
    const OnCHangeHandle=(e)=>{
    const Value=e.target.value
       const FilterData= Data.filter((e)=>{
            return e.toLowerCase().includes(Value.toLowerCase())
        })

        //  HanldeAutoComplete(FilterData)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate("/Product", { state: { Cat: send } }) 
            window.location.reload()
        }
        
      };
    const Navigation=()=>{

        navigate("/Product", { state: { Cat: send } })   
        window.location.reload()
    }
    useEffect(()=>{
         
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d)=>{
            const Auto=[]
            d.data.map((e)=>{
                    Auto.unshift(e.Product_Name.Product_Name)
                    Auto.unshift(e.Product_Name.Category)
                    Auto.unshift(e.Product_Name.Category_Name)
            })
            setData(Auto)
           

        })

    },[])
  return (
  <>
      {/* <div className='d-flex flex-row justify-content-between' style={{background:'#2457AA',height:'50px',overflowX:'hidden'}}>
             <div className='d-none d-md-block'>
                  <img className='mt-1 ml-2  rounded-circle' src={img1}    width={'80px'} height={'40px'}   />
             </div>
             <input className='col-10 col-sm-7 col-md-6   ml-auto mr-auto'   onChange={OnCHangeHandle}  onKeyDown={handleKeyDown}  type="text" placeholder='Search Here Your Favorite Products' style={{borderRadius:'30px'}} />
             <span className=' d-none d-sm-block text-white card-footer'>{localStorage.getItem('CustamerName')}</span> 


      </div> */}
      
  </>
  )
}

export default Nav2 
