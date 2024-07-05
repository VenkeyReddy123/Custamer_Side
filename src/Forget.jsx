import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Forget = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState(true)
    const [Otp, setOtp] = useState(false)
    const [Pass, setPass] = useState(false)
    const [em, setem] = useState('')
    const [otp, setotp] = useState(0)
    const [npw, setnpw] = useState('')
    const [napw, setnapw] = useState('')
    const [VAEPOP, SetVAEPOP] = useState(false)
    const [OTPSPOP, SetOTPSPOP] = useState(false)
    const[VAOTPPOP,SetVAOTPPOP]=useState(false)
    const[PWPOP,SETPOP]=useState(false)
    const[PSUPOP,SETPSUPOP]=useState(false)
    const HandleSendOtp = () => {
        axios.post('http://127.0.0.1:8000/LoginOtpDetails/', { Email: em })
            .then(response => {
                localStorage.setItem('otp', Number(response.data.Message))
                SetOTPSPOP(true)
                setemail(!email)
                setOtp(!otp)

            })
            .catch(error => {

                SetVAEPOP(true)
            });

    };
    const HandleRecivedOtp = () => {
        SetOTPSPOP(false)
        if (otp == Number(localStorage.getItem('otp'))) {
            setOtp(!Otp)
            setPass(!Pass)
        }
        else {
            SetVAOTPPOP(true)
        }

    }
    const HadnleAGinSendOtp=()=>{
        axios.post('http://127.0.0.1:8000/LoginOtpDetails/', { Email: em })
            .then(response => {
                localStorage.setItem('otp', Number(response.data.Message))    
                SetOTPSPOP(true)
            })
            .catch(error => {
                SetVAEPOP(true)
            });

    }
    const HandleChangePassword = () => {
        if (npw === napw) {
            const Data = {
                "Email":em,
                "Password": npw
            }
            axios.patch("http://127.0.0.1:8000/LoginPasswordChange/", Data).then((d) => {
                SETPSUPOP(true)
                navigate("/")
            }).catch((e) => {
                
            })
        }
        else {
           SETPOP(true)
        }

    }
    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
                {email &&

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        HandleSendOtp()


                    }} className='form-group text-center shadow-lg' style={{ background: 'light', borderRadius: '20px', maxWidth: '400px', width: '90%' }}>

                        <div className='mt-4 mx-3'>
                            <label htmlFor="ml" className='form-label text-warning'>Enter Valid Email  <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='form-control' onChange={(e) => { setem(e.target.value) }} placeholder='Enter Your Email' name='ml' id='ml' required />
                        </div>
                        <span className='text-danger h6'>You Can Recive Otp Registed Email </span>


                        <div className='text-center mb-2'>
                            <input type="submit" value="Send Otp" className='btn btn-primary mt-2' />
                        </div>
                    </form>
                }




                {Otp &&<> <div className='shadow-sm text-center ' style={{height:'250px',width:'300px'}}>
                    <form  onSubmit={(e) => {
                    e.preventDefault()
                    
                    HandleRecivedOtp()


                }} className='form-group col-12  ' style={{  borderRadius: '20px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter OTP<span style={{ color: 'red' }}>*</span></label>
                        <input type="number" className='form-control' onChange={(e) => { setotp(e.target.value) }} placeholder='Enter Your Otp' name='ml' id='ml' required />
                    </div>
                   
                    <span className='text-danger'>You Can Recive Otp Registed Email </span>
                        

                    <div className=' mb-2'>
                        <input type="submit" value="Submit Otp" className='btn btn-primary mt-2' />
                    </div>
                   
                   
                    
                   
                </form>
                <button className='btn btn-warning mr-4' onClick={()=>{SetOTPSPOP(false)
                            HadnleAGinSendOtp()}}>Resend Otp</button>
                
                
                
                </div>
                </>}






    
                {Pass && <form onSubmit={(e) => {
                    e.preventDefault()
                    HandleChangePassword()


                }} className='form-group shadow-lg mt-2' style={{ borderRadius: '20px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter New Password  <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" onChange={(e) => { setnpw(e.target.value) }} className='form-control' placeholder='Enter New Password' name='ml' id='ml' required />
                    </div>

                    <div className='mt-4 mx-3'>
                        <label className='form-label text-warning' htmlFor="pw">Enter Again Password <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' onChange={(e) => { setnapw(e.target.value) }} name="pw" required placeholder='Enter AGain Password' />
                    </div>

                    <div className='text-center mb-2'>
                        <input type="submit" value="ChangePassword" className='btn btn-primary mt-4' />
                    </div>
                </form>}


            </div>
            {VAEPOP && <>               
                 <Modal show={VAEPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                   SetVAEPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Entered Email was Not Registred</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { SetVAEPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {OTPSPOP&& <>
                
                <Modal show={OTPSPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    SetOTPSPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>OTP sent successfully!</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {  SetOTPSPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {VAOTPPOP&& <>
                {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-warning p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetVAOTPPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>You Entred Wrong OTP Number</span>
                    </div>
                </div> */}
                 <Modal show={VAOTPPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                     SetVAOTPPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>You Entred Wrong OTP Number</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {   SetVAOTPPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {PWPOP&& <>
                {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-primary p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SETPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Please Entre New Password And Again Password Same</span>
                    </div>
                </div> */}
                 <Modal show={PWPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                       SETPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Please Entre New Password And Again Password Same</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {    SETPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
            {PSUPOP&& <>
                {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-primary p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SETPSUPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Password Changed Successfully!</span>
                    </div> */}
                {/* </div> */}
                <Modal show={PSUPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                     SETPSUPOP(false)

                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Password Changed Successfully!</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {     SETPSUPOP(false)
 }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>}
        </>
    )
}

export default Forget