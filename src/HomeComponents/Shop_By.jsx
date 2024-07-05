import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Shop_By = () => {
    const [Data2, setData2] = useState(null)
    const navigate=useNavigate()
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
            setData2(d.data)


        }).catch((e) => {
            alert('Please Try AGian Later Somthing Eroor')
        })

    }, [])
    return (
        <>
        <div className='col-12 container card-footer bg-primary' style={{height:'10px'}}>

        </div>
        <div className='d-flex flex-row col-12 container ' style={{position:'relative',top:'-150px',overflowX:'auto'}}>
        {Data2&&Data2.slice(4,9).map((e)=>{
            return(
                <>
                    <div onClick={() => { navigate('/Dis', { state: { data: e } }) }} style={{cursor:'pointer'}} className=' rounded-circle col-8  col-md-4 col-lg-3'>
                             <img className='rounded-circle p-2' src={e.ImageUrl} style={{height:'100px'}} alt="" srcset="" />
                    </div>
                </> 
            )
         })}
        </div>


        </>
    )
}

export default Shop_By