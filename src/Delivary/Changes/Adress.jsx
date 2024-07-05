import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Adress = ({Display}) => {
  
  
  const [DisAdd,setDisAdd]=useState(false)
  const [Dislist,setDisList]=useState(true)
  const[DisButton,setDisButton]=useState(true)
  let Arr=[]
  const Location=useLocation()
  const Data=Location.state.Product
  const navigate=useNavigate()
  
  const [List,setList]=useState([])
  const Full=useRef()
  const Mn=useRef()
  const Pin=useRef()
  const Sta=useRef()
  const Ci=useRef()
  const Ho=useRef()
  const Ro=useRef()
  const HandleSubmit = () => {
    let addresses = [localStorage.getItem('Address')]
    console.log(addresses)
    let addressArr = [];

    if (addresses) {
        try {
            addressArr = JSON.parse(addresses);
        } catch (error) {
            console.error("Error parsing addresses from localStorage:", error);
            // Handle parsing error if necessary
        }
    }

    const Address = {
        "Name": Full.current.value,
        "Number": Mn.current.value,
        "Pin": Pin.current.value,
        "State": Sta.current.value,
        "City": Ci.current.value,
        "House": Ho.current.value,
        "Road": Ro.current.value
    };

    addressArr.push(Address);
    console.log(Address)

    localStorage.setItem('Address', JSON.stringify(addressArr)); // Use 'addresses' key here
   
    localStorage.setItem('Address2', JSON.stringify(Address))
    console.log(JSON.stringify(localStorage.getItem("Address2")))
    Display()
    // navigate('/Check')
    // navigate('/Check',{state:{Product:Data,Add:Address}})
}

  useEffect(() => {
    const Address = localStorage.getItem('Address');
    
     // Corrected typo
     // Declare outside to ensure it's accessible outside the if block
    if (Address) {
        try {
           Arr=[...JSON.parse(Address)]
           setList(Arr)
                
           
        } catch (error) {
          // alert('jj')
        
          
            // console.error("Error parsing Address from localStorage:", error);
            // Handle parsing error if necessary
        }
     
    }
    else{
      setDisAdd(!DisAdd)
      setDisList(!Dislist) 
      setDisButton(!DisButton)
    }
    // Now you can use Arr here or do whatever you need to do with it
}, []);

  return (

    <>
     
    {/* {Arr&&Arr.map((Add,ind)=>{
      // console.log(Add)
      return(
        <>  
            <p>{ind}</p>
            <span style={{ fontWeight: 'bold' }} className='text-primary'>{Add.Name}</span>
            <span style={{ fontWeight: 'bold' }} className='text-dark'>{Add.House}{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
             
        </>
      )
    })} */}
    {Dislist&&List&&List.map((Add,ind)=>{
        return(
          <>  
              {/* <p>{ind}</p> */}
             <div className='mt-2  mr-1 ' style={{textWrap:'wrap',overflowX:'hidden'}}>
             <span style={{ fontWeight: 'bold' }} className='text-primary'>{Add.Name}</span><br></br>
              <span style={{ fontWeight: 'bold' }} className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},<br></br>Pin:-{Add.Pin}</span><br></br>
             </div>
             <button className='btn-info' onClick={()=>{
              localStorage.setItem('Address2', JSON.stringify(Add))
              Display()}}>Select<i class="fa-solid fa-check ml-2 text-dark"></i></button>

          </>
        )
    })}
    <br></br>
    {DisButton&&<button className='mt-2' onClick={()=>{setDisAdd(!DisAdd)
    setDisList(!Dislist)
    setDisButton(!DisButton)
    }}>Addnew Adress</button>}

    {DisAdd&&<div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowX: 'hidden' }}>
        <span className='mt-3 text-warning'> <i className="fa-solid fa-user text-danger mr-2 rounded-circle"></i>Give Adress For Delivary Prodict</span>
        <form onSubmit={(e)=>{e.preventDefault()
           HandleSubmit()
        }} className='form-group shadow mt-5' style={{ background: '#1C0406', borderRadius: '50px', maxWidth: '400px', width: '90%' }}  >

          <div className='mt-3 mx-3'>
            <label htmlFor="fn" className='form-label text-white'>Full Name<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className='form-control' placeholder='Full Name(Required)*' ref={Full} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="mn" className='form-label text-white'>Enter Your Mobile No. <span style={{ color: 'red' }}>*</span></label>
            <input type="number" className='form-control' placeholder='Enter Your mobile Number'  ref={Mn} required />
          </div>

          <div className='mt-3 mx-3'>
            <label htmlFor="ln" className='form-label text-white'>PinCode<span style={{ color: 'red' }}>*</span></label>
            <input type="number" placeholder='Enter Pincode' ref={Pin} required />
          </div>
          

          <div className='mt-3 mx-3 d-flex flex-row'>
            <input type="text" className='form-control mr-3' placeholder='State (Requred)*' ref={Sta} required />
            <input type="text" className='form-control' placeholder='City (Required)*' ref={Ci}  required />

          </div>

          <div className='mt-3 mx-3'>
            <input type="text" className='form-control  mt-2' placeholder='Houde No,Buildning Name (Required)*' ref={Ho} required />
            <input type="text" className='form-control mt-3' placeholder='Road Name,Area,COlony (Required)*' ref={Ro}  required />
          </div>

          <div className='text-center mt-2'>
            <input type="submit" value="Save Adress" className='btn btn-primary mb-2 mt-2 col-9 bg-danger'  />
          </div>
        </form>
      </div>}
    </>
  )
}

export default Adress