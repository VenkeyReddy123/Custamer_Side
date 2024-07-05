import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import './Login2.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Login() {

  const [EPop, SetEPop] = useState(false)
  const [PPop, setPPop] = useState(false)
  const navigate = useNavigate();
  const emref = useRef(null)
  const pref = useRef(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const HandleSubmit = () => {
    const Em = emref.current.value
    const Pas = pref.current.value
    axios.get("http://127.0.0.1:8000/LoginDetails/")
      .then((response) => {
        let data = response.data;
        let Arr = []
        for (let entry of data) {
          if (entry.Email === Em) {
            Arr.unshift(1)
            if (entry.Password === Pas) {
              localStorage.setItem('id', entry.id)
              localStorage.setItem('CustamerName', entry.Custamer_Name)
              localStorage.setItem('email', entry.Email);
              localStorage.setItem('password', entry.Password);
              localStorage.setItem('mobile_number', entry.Mobile_Number)

              navigate('/Home')
            } else {
              setPPop(true)
            }

          }


        }
        if (Arr.length == 0) {
          SetEPop(true)
        }

      })

  }


  return (
    <>


  

      <div className="mt-5 ml-auto mr-auto d-flex flex-column d-md-flex flex-md-row justify-content-center col-11  " style={{overflow:'hidden'}}>
        <div class=" col-12  mt-3 col-sm-12 col-md-9  col-xl-5 shadow-lg card " style={{overflow:'hidden'}}>
          <form className='mt-auto mb-auto' onSubmit={(e) => {
            e.preventDefault()
            HandleSubmit()
          }} action="" style={{overflow:'hidden'}}>
            <h2 className='h2'>Login Heare</h2>
            <label className='label' >
              <span className='span'>Email</span>
              <input className='pw input ' ref={emref} required type="email" />
            </label>
            <label className='label'>
              <span className='span'>Password</span>
              <input className='pw input ' ref={pref} required type="password" />
            </label>
            <p class="forgot-pass" onClick={() => { navigate('/For') }} style={{cursor:'pointer'}}>Forgot password?</p>
            <button type="submit" className="submittt button">Sign In</button>
          </form>
        </div>
        <div className='col-12  shadow-sm mt-3 col-md-3 col-xl-5 '>
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
              <span className='btn btn-secondary' style={{cursor:'pointer'}} onClick={() => { navigate('/Reg') }}>SIGN UP</span>
            </div>
            
          </div>
        </div>
        
      </div>

      {/*  */}

      {/* <div className="sub-cont col-12 col-md-4">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>If you already has an account, just sign in. We've missed you!</p>
            </div>
            <div className="img__btn">
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Time to feel like home,</h2>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <button type="button" className="submit" onClick={()=>{}}>Sign Up</button>
            <button type="button" className="fb-btn">Join with <span>facebook</span></button>
          </div>
        </div> */}


      {EPop && <>
        <Modal show={EPop} >
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                  SetEPop(false)
                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

              </div>
              <span className='text-dark  pw'>Please enter valid email</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { SetEPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
      {PPop && <>

        <Modal show={PPop} >
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                  setPPop(false)
                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

              </div>
              <span className='text-dark  pw'>please enter valid password</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setPPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </>}

    </>
  )
}

export default Login;
