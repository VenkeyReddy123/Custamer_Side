import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Adress = ({ Display }) => {


  const [DisAdd, setDisAdd] = useState(false)
  const [Dislist, setDisList] = useState(true)
  const [DisButton, setDisButton] = useState(true)
  const [Patch, SetPatch] = useState(false)
  const [RPin, SetRPin] = useState(null)
  const [RMn, SetRMn] = useState(null)
  const [PinPop, SetPinPop] = useState(false)
  let Arr = []
  const Location = useLocation()
  const Data = Location.state.Product
  const navigate = useNavigate()

  const [List, setList] = useState([])
  const Full = useRef()
  const Mn = useRef()
  const [Pin,SetPin] = useState()
  const [Sta,SetSta] = useState('')
  const [Ci,SetCi] = useState('')
  const Ho = useRef()
  const [Ro,SetRO] = useState('')
  const [MPop, SetMPop] = useState(false)

  const HandleSubmit = () => {
    if (String(Mn.current.value).length < 10) {
      SetMPop(true)
      return
    }
    if (String(Pin).length < 6) {
      SetPinPop(true)
      return
    }
    
    const Address = {
      "Name": Full.current.value,
      "Number": Mn.current.value,
      "Pin": Pin,
      "State": Sta,
      "City": Ci,
      "House": Ho.current.value,
      "Road": Ro,
    };
    const Data = {
      "Custamer_Name": Number(localStorage.getItem('id')),
      "Adrss_List": JSON.stringify(Address)
    }
    console.log(Data)

    if (Patch) {
      axios.patch("http://127.0.0.1:8000/AdressListDetails/", Data).then((d) => {
         const AddList = d.data.Adrss_List.split("@")
          localStorage.setItem("Ind", AddList.length - 1)
           Display()
      }).catch((e) => {

      })
    }
    else {
      axios.post("http://127.0.0.1:8000/AdressListDetails/", Data).then((d) => {
        Display()
      }).catch((e) => {

      })
    }
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/AdressListDetails/").then((d) => {
      const Filter = d.data.filter((d) => {
        return d.Custamer_Name === Number(localStorage.getItem('id'))
      })
      if (Filter.length == 0) {
        setDisAdd(true)
        setDisButton(false)
        SetPatch(false)


      } else {
        SetPatch(true)
        setDisList(true)
        setDisButton(true)

        const Obj = Filter[0]
        const Arr2 = Obj.Adrss_List.split("@")

        const Convesion = Arr2.map((e) => {
          return JSON.parse(e)
        })

        setList(Convesion)
      }

    }).catch((e) => {

    })
  }, []);
  const RemoveAdress = (Index) => {
    const Filter = List.filter((e, ind) => {
      return Index != ind
    })
    let Address = ''
    let Filter2 = Filter.map((e) => {
      return JSON.stringify(e)
    })
    const Data = {
      "Custamer_Name": Number(localStorage.getItem('id')),
      "Adrss_List": Filter2.join('@')
    }

    if (Filter2.length == 0) {
      axios.delete("http://127.0.0.1:8000/RemoveAdress/", { data: Data }).then((d) => {
        window.location.reload()
      }).catch((e) => {
        alert("Error")
      })
    } else {
      axios.patch("http://127.0.0.1:8000/RemoveAdress/", Data).then((d) => {
        const ListUrls = d.data.Adrss_List.split('@')
        const Modify = ListUrls.map(((e) => {
          return JSON.parse(e)
        }))
        setList(Modify)
      }).catch((e) => {
        console.log('Error')
      })
    }
  }
  const CurrentLocation=async()=>{
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const reverseGeocodingResponse = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
    
      const reverseGeocodingData = await reverseGeocodingResponse.data;
       console.log(reverseGeocodingData.address)
       SetPin(reverseGeocodingData.address.postcode)
       SetSta(reverseGeocodingData.address.state)
       SetRO(reverseGeocodingData.address.road)
       SetPin(reverseGeocodingData.address.postcode)
       SetSta(reverseGeocodingData.address.state)
       SetRO(reverseGeocodingData.address.road)
       SetCi(reverseGeocodingData.address.suburb?reverseGeocodingData.address.suburb:reverseGeocodingData.address.town)

  });
  }

  return (

    <>
      {Dislist && List && List.map((Add, ind) => {
        return (
          <>
            <div className='mt-2  mr-1 ' style={{ textWrap: 'wrap', overflowX: 'hidden' }}>
              <span style={{ fontWeight: 'bold' }} className='text-primary'>{Add.Name}</span><br></br>
              <span style={{ fontWeight: 'bold' }} className='text-dark'>{Add.House}<br></br>{Add.Road}<br></br>{Add.State}{Add.City},<br></br>Pin:-{Add.Pin}</span><br></br>
            </div>
            {<>
              <button className='btn-info btn' onClick={() => {
                localStorage.setItem('Ind', ind)
                Display()

              }} >Select<i class="fa-solid fa-check ml-2 text-white"></i></button>
              <button className='btn btn-danger ml-2 text-white ' onClick={() => {
                RemoveAdress(ind)

              }} >Remove<i class="fa-regular fa-circle-xmark ml-2"></i></button>
            </>}

          </>
        )
      })}
      <br></br>
      {DisButton && <button className='mt-2 btn btn-warning pw text-white'  onClick={() => {
        setDisAdd(true)
        setDisList(false)
        setDisButton(false)
      }}>Add New Adress</button>}
      {DisAdd && <>
        <div className='col-12 col-md-7'>
          <div className='d-flex flex-column col-sm-flex flex-sm-row justify-content-around' >
              <small className='pwwww'><i class="fa-solid fa-truck text-primary ml-2 mt-2" style={{ fontSize: '20px' }}></i>Give Delivary Adress</small>
             <div className='ml-2' onClick={CurrentLocation}>
              <button  className=' mt-2 btn text-primary btn-white' style={{border:'2px solid skyblue'}}><i className='fa-solid fa-location-crosshairs mr-1 text-primary'></i>use current location</button></div>
          </div>
          <form onSubmit={(e) => {
          e.preventDefault()
          HandleSubmit()
        }} className='mt-2'>
            <div className='d-flex flex-column d-sm-flex flex-sm-row justify-content-between'>
              <input type="text" className='form-control col-11 col-sm-6 mt-2 ml-2' placeholder='Full Name(Required)*' ref={Full} required />
              <input type="number" className='form-control col-11 col-sm-6 mt-2 ml-2' value={RMn} onChange={(e) => {
                if (String(e.target.value).length <= 10) {
                  SetRMn(e.target.value)
                }
              }} placeholder='Enter Your mobile Number' maxLength={10} ref={Mn} required />
            </div>
            <div className='d-flex flex-column d-sm-flex flex-sm-row justify-content-between'>
              <input type="number" placeholder='Enter Pincode' className='form-control col-11 col-sm-4 mt-2 ml-2' value={Pin} onChange={(e) => {
                if (String(e.target.value).length <= 6) {
                  SetPin(e.target.value)
                }
              }}  required />
                <input type="text" value={Sta} className='form-control col-11 col-sm-4 mt-2 ml-1' placeholder='State (Requred)*' onChange={(e)=>{SetSta(e.target.value)}} required />
              <input type="text" value={Ci} className='form-control col-11 col-sm-4 mt-2 ml-1' placeholder='City (Required)*' onChange={(e)=>{SetCi(e.target.value)}}  required />

            </div>
            <div className='d-flex flex-column d-sm-flex flex-sm-row justify-content-between'>
            <input type="text"  className='form-control col-11 col-sm-6 mt-2  mt-2 ml-2' placeholder='Houde No,Buildning Name (Required)*' ref={Ho} required />
            <input type="text" value={Ro} className='form-control col-11 col-sm-6 mt-2 mt-2 ml-2' placeholder='Road Name,Area,Colony (Required)*' onChange={(e)=>{SetRO(e.target.value)}} required />
          </div>
          <div className='text-center mt-2'>
            <input type="submit"  value="Save Adress" className='btn btn-warning pw  bg-warning' />
          </div>

          </form>
        </div>
      </>}

      {MPop && <>
        <Modal show={MPop} >
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-dark" onClick={() => {
                  SetMPop(false)
                }} style={{ fontSize: '20px', borderRadius: 'px' }}></i>

              </div>
              <span className='text-danger  pw'>Please Enter 10 digits for your number</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { SetMPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
      {PinPop && <>
        <Modal show={PinPop} >
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-dark" onClick={() => {
                  SetPinPop(false)
                }} style={{ fontSize: '20px', borderRadius: 'px' }}></i>

              </div>
              <span className='text-danger  pw'>Please Enter 6 digits Pin number</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { SetPinPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
    </>
  )
}

export default Adress