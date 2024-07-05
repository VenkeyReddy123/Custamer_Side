import axios from 'axios'
import React, { useRef, useState } from 'react'

const Cupon = ({ UpdateOff }) => {
  const [code, setCode] = useState(null)
  const [cupon, SetCupon] = useState()

  const HandleSubmit = (e) => {

    e.preventDefault()
    axios.get("http://127.0.0.1:8000/CuponCodeDetails/").then((d) => {
              const FilterData = d.data.filter((e) => {
                         return e.Code_Name == code
                   })
      if(FilterData.length>0){
        axios.get("http://127.0.0.1:8000/CheckCodeDetails/").then((d)=>{
         
            if(d.data.length>0){
                 
                const Filter= d.data.filter((e)=>{
                  return e.Code_Name==FilterData[0].id
                })   
                
                if(FilterData[0].Limit>=Filter.length){
              
                    if(new Date().toLocaleDateString()<new Date(FilterData[0].ExpireDate).toLocaleDateString()){
                      HandleCupon(FilterData) 
                      return
                    }
                }
                
            }
            else{
              HandleCupon(FilterData) 
            }
        })
      }else{
        alert('Cupon Code Is Wrong')
      }
      
      
    })
  }
  const HandleCupon = (Data) => {
    const Obj = Data[0];
    // console.log(Obj)
    if( Obj.Discount_Type=="Amount"){
         
         UpdateOff("Amo",Obj.Code_Off,Obj.id)
    }
    else{
         UpdateOff("Dis",Obj.Code_Off,Obj.id)
    }

    
  };

  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <input type="text" placeholder='Enter CouponCode' className='col-9 mt-4' onChange={(e) => { setCode(e.target.value) }} />
          <input type='submit' value={"Check"} className=' ml-2 btn btn-primary' />
        </form>
      </div>
    </>
  )
}

export default Cupon