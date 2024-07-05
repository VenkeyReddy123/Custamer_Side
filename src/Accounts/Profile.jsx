import React, { useEffect, useState } from 'react'
import Ho from '../Data/Products/home.jpg'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Profile.css'


const Profile = ({ HandleOpenprofile }) => {
  const [Data, SetData] = useState([])
  const [EP, SetEP] = useState(false)
  const [EI, SetEI] = useState(false)
  const [N, SetN] = useState('')
  const [E, SetE] = useState('')
  const [M, SetM] = useState('')
  const [I, SetI] = useState('')
  const [EPop, SetEPop] = useState(false)
  const [MPop, SetMPop] = useState(false)
  const [LPop, setLPop] = useState(false)
  const [Showpage, SetShowPage] = useState(false)

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/LoginDetails/").then((d) => {
      if (localStorage.getItem('id')) {
        const filter = d.data.filter((e) => {
          return e.id == Number(localStorage.getItem('id'))

        })
        SetData(filter)
        SetShowPage(true)
      } else {
        SetShowPage(true)
        setLPop(true)
        return
      }



    })
  }, [])
  const HandleEdit = (e) => {
    SetN(e.Custamer_Name)
    SetE(e.Email)
    SetM(e.Mobile_Number)
    SetEP(true)
  }
  const HandleSave = () => {
    if (M.length < 10 || M.length > 10) {
      SetMPop(true)
      return
    }
    axios.get('http://127.0.0.1:8000/LoginDetails/').then((d) => {

      const FilterData = d.data.filter((e) => {
        return Number(localStorage.getItem('id')) != e.id
      })
      const FilterData2 = FilterData.filter((e) => {
        return E == e.Email
      })

      if (FilterData2.length > 0) {
        SetEPop(true)
        return
      } else {
        const Data = {
          "pk": Number(localStorage.getItem('id')),
          "Custamer_Name": N,
          "Email": E,
          "Mobile_Number": M
        }
        axios.patch("http://127.0.0.1:8000/LoginDetails/", Data).then((d) => {
          axios.get("http://127.0.0.1:8000/LoginDetails/").then((d) => {
            const filter = d.data.filter((e) => {
              return e.id == Number(localStorage.getItem('id'))
            })

          
              SetData(filter)
              SetEP(false)
            
           
            const entry = filter[0]
            localStorage.setItem('CustamerName', entry.Custamer_Name)
            localStorage.setItem('email', entry.Email);
            localStorage.setItem('mobile_number', entry.Mobile_Number)
            
          })
        }).catch((e) => {

        })
      }
      if(I){
        HandleEditIamge()
      }



    })









  }
  const HandleEditIamge = () => {
    const Data = {
      "pk": Number(localStorage.getItem('id')),
      "Profile_Pic": I
    }
    axios.patch("http://127.0.0.1:8000/LoginImageDetails/", Data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((d) => {

      const Data = {
        "pk": Number(localStorage.getItem('id')),
        "Profile_Pic": d.data.Profile_Pic
      }
      axios.patch("http://127.0.0.1:8000/LoginImageDetails2/", Data).then((d) => {
        axios.get("http://127.0.0.1:8000/LoginDetails/").then((d) => {
          const filter = d.data.filter((e) => {
            return e.id == Number(localStorage.getItem('id'))
          })
    
          SetData(filter)
          SetEI(false)
        })

      }).catch((e) => {

      })
    }).catch((e) => {

    })
  }
  return (
    <>
      {Showpage ? <><div className='col-12 card ' style={{height:'600px'}}>
        <i class="fa-solid fa-xmark ml-auto mt-3 card  text-danger p-1" onClick={() => { HandleOpenprofile() }} style={{ borderRadius: '5px',cursor:'pointer' }}></i>
        {Data && Data.map((e) => {
          let all = null
          if (!e.P_Url) {
            all = true
          }
          return (
            <>
              {/* <small className='ml-auto mr-auto mb-2 h6 text-success'>Profile</small>
              <div className=' col-10 ml-auto mr-auto   mt-2' style={{ height: '200px', position: 'relative', borderRadius: '50%' }}>
                {(EI || all) && <><input type="file" name="" id="" onChange={(e) => {
                  SetI(e.target.files[0])
                }} />
                  <button className='btn btn-success mt-2' onClick={() => { HandleEditIamge() }}>Save</button>
                </>}
                {!EI && e.P_Url && <><img accept='image/*' className='card p-1' src="" alt="" srcset={e.P_Url} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  <i onClick={() => { SetEI(true) }} class="fa-regular fa-pen-to-square text-primary" style={{ position: 'absolute', bottom: '40px', right: '50px', cursor: 'pointer', fontSize: '25px' }}></i>
                </>}


              </div>

              <div className='col-12 mt-2 '>
                <div className='d-flex flex-column mt-2'>
                  <label className='h6' htmlFor="">Name</label>
                  {EP ? <><input type="text" value={N} onChange={(e1) => {
                    SetN(e1.target.value)
                  }} className='form-control' /></> : <><small>{e.Custamer_Name}</small></>}
                </div>
                <div className='d-flex flex-column mt-2'>
                  <label className='h6' htmlFor="">Email</label>
                  {EP ? <><input type="email" name="" id="" value={E} onChange={(e1) => {
                    SetE(e1.target.value)
                  }} className='form-control' /></> : <><small>{e.Email}</small></>}
                </div>
                <div className='d-flex flex-column mt-2'>
                  <label className='h6' htmlFor=""  >Mobile_Number</label>
                  {EP ? <><input type="number" onChange={(e1) => {
                    if (e1.target.value.length <= 10) {
                      SetM(e1.target.value)
                    }
                  }} className='form-control' name="" id="" value={M} /></> : <><small>{e.Mobile_Number}</small></>}
                </div>
                <div className='mb-2 mt-2'>
                  {EP ? <><button className='btn btn-primary' onClick={HandleSave}>Save</button></> : <> <button className='btn btn-primary' onClick={() => { HandleEdit(e) }}>Edit Profile</button></>}
                </div>
              </div> */}
              <div className='mt-2' id="algn">
                <div className='' style={{ height: '300px', width: '100%' }}>
                  <div classname='d-flex flex-row' id="upper-bg" >
                  
                    {(EP || all) && <>
                    <div className='col-12 ' style={{position:'absolute',bottom:'20px'}}>
                    <input type="file" name="" id="" onChange={(e) => {
                      SetI(e.target.files[0])
                    }} />
                   {all&&I&&<><button className='mt-2 btn btn-secondary' onClick={()=>{HandleEditIamge()}}>Save</button></>}
                      
                    </div>
                    </>}
                    {!EP && e.P_Url && <><img accept='image/*' className='p-1   profile-pic' src="" alt="" srcset={e.P_Url} />
                     
                    </>}
                  </div>
                  
                  
                  
                  <div className='card mt-5' style={{border:'none',}}>
                   {EP ? <><input type="text" value={N} onChange={(e1) => {
                    SetN(e1.target.value)
                   }} className='form-control' /></> : <>
                   <small className='ml-auto mr-auto mt-5 ' style={{fontSize:'20px',fontWeight:'bold',textWrap:'wrap'}}>{e.Custamer_Name}</small></>}
                   </div>
                   <div className='card  mt-2' style={{border:'none'}}>
                   {EP ? <><input type="email" name="" id="" value={E} onChange={(e1) => {
                    SetE(e1.target.value)
                  }} className='form-control ' /></> : <><small className='ml-auto mr-auto'>{e.Email}</small></>}
                   </div>
                   <div className='card  mt-2' style={{border:'none'}}>
                   {EP ? <><input type="number" onChange={(e1) => {
                    if (e1.target.value.length <= 10) {
                      SetM(e1.target.value)
                    }
                    }} className='form-control' name="" id="" value={M} /></> : <><small className='ml-auto mr-auto'>{e.Mobile_Number}</small></>}
                   </div>
                   <div className='mt-2 card' style={{border:'none'}}>
                        {EP  ? <><button className='btn btn-primary ml-auto mr-auto' onClick={HandleSave}>Save</button></> : <> <button className='btn btn-primary ml-auto mr-auto' onClick={() => { HandleEdit(e) }}>Edit Profile</button></>}
                   </div>

                </div>

              </div>
              {/* <div class="license">
        <div class="ll"><a  href="https://icons8.com/icon/P7UIlhbpWzZm/gmail">Gmail</a> icon by <a href="https://icons8.com">Icons8</a></div>
        <div class="ll"><a  href="https://icons8.com/icon/AZOZNnY73haj/github">GitHub</a> icon by <a href="https://icons8.com">Icons8</a></div>
        <div class="ll"><a  href="https://icons8.com/icon/13930/linkedin">LinkedIn</a> icon by <a href="https://icons8.com">Icons8</a></div>
        <div class="ll"><a  href="https://icons8.com/icon/118497/facebook">Facebook</a> icon by <a href="https://icons8.com">Icons8</a></div>
        <div class="ll"><a  href="https://icons8.com/icon/u8MTpAq972MG/like">Like</a> icon by <a href="https://icons8.com">Icons8</a></div>
        <div class="ll"><a  href="https://icons8.com/icon/8h51YOzhBJmT/comment">Comment</a> icon by <a href="https://icons8.com">Icons8</a></div>
    </div> */}
            </>
          )
        })}

      </div>
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
        {EPop && <>

          <Modal show={EPop} >
            <Modal.Body>

              <div className="form-group">

                <div className='col-12 d-flex flex-row justify-content-end '>
                  <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                    SetEPop(false)
                  }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                </div>
                <span className='text-success  pw'>This email is already logged</span>
              </div>



            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => { SetEPop(false) }}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>}
        {
          LPop && <>

            <Modal show={LPop} >
              <Modal.Body>

                <div className="form-group">

                  <div className='col-12 d-flex flex-row justify-content-end '>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                      HandleOpenprofile()
                      setLPop(false)
                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                  </div>
                  <span className='text-danger  pw'>Please Login</span>
                </div>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  HandleOpenprofile()
                  setLPop(false)
                }}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        }
      </> : <>
        <div class="d-flex flex-column align-items-center col-12  card " style={{ height: '100vh' }}>
          <div class=" mt-auto mb-auto d-flex flex-row" role="status">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>

          </div>
        </div>
      </>}
    </>
  )
}

export default Profile