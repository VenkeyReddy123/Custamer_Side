import axios from 'axios'
import React, { useRef, useState } from 'react'

const CuponPage = ({ UpdateOff, Paypop }) => {
  const [code, setCode] = useState(null)
  const [cupon, SetCupon] = useState()

  const HandleSubmit = (e) => {

    e.preventDefault()
    const Data = {
      "Code_Name": code,
      "Custamer_Name": Number(localStorage.getItem('id'))
    }
    axios.post("http://127.0.0.1:8000/Check2CuponDetails/", Data).then((d) => {
      axios.get("http://127.0.0.1:8000/CuponCodeDetails/", { data: Data }).then((d) => {
        const FilterData = d.data.filter((e) => {
          return e.Code_Name == code
        })
        const Obj = FilterData[0]
        const TDate = new Date()
        const EDate = new Date(Obj.ExpireDate)

        // if(Today<=Expire){
        //      
        // }
        // else{
        //    
        // }
        if (TDate.getFullYear() < EDate.getFullYear() ||
          (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() < EDate.getMonth()) ||
          (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() === EDate.getMonth() && TDate.getDate() <= EDate.getDate())) {

          UpdateOff(FilterData, 'Succ')
        } else {
          UpdateOff("ggg", 'Expi')

        }


      })

    }).catch((e) => {
      UpdateOff('SSS', 'Error', e.response.data.Message)
    })
  }
  const HandleCupon = (Data) => {
    const Obj = Data[0];
    if (Obj.Discount_Type.toLowerCase().includes("Amount")) {
      UpdateOff("Amo", Obj.Code_Off, Obj.id)
    }
    else {
      UpdateOff("Dis", Obj.Code_Off, Obj.id)
    }


  };

  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <input type="text" placeholder='Enter CouponCode' className='col-9 mt-4' style={{border:'2px solid lightgray',borderRadius:'5px'}} onChange={(e) => { setCode(e.target.value) }} />
          <input type='submit' value={"Check"} className=' ml-2 btn btn-primary' />
        </form>
      </div>
    </>
  )
}

export default CuponPage