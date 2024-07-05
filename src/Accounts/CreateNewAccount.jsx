import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
import './Create2.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const CreateNewAccount = () => {
    const navigate = useNavigate()
    const [width, setWidth] = useState(100);
    const Nref = useRef(null)
    const Eref = useRef(null)
    const Mref = useRef(null)
    const Pref = useRef(null)
    const Rpref = useRef(null)
    const [MPop, SetMPop] = useState(false)
    const [EPop, SetEPop] = useState(false)
    const [PPop, setPPop] = useState(false)
    const [Loding, SetLoding] = useState(false)
    const [RMn, SetRMn] = useState(null)
    const HandleSubmit = (e) => {
        const name = Nref.current.value
        const email = Eref.current.value
        const number = Mref.current.value
        const pass = Pref.current.value
        const rpass = Rpref.current.value

        axios.get('http://127.0.0.1:8000/LoginDetails/')
            .then((d) => {
                const FilterData = d.data.filter((e) => {
                    return email == e.Email
                })
                if (FilterData.length > 0) {
                    SetEPop(true)
                } else {

                    const Data = {
                        "Email": email,
                        "Mobile_Number": number,
                        "Custamer_Name": name,
                        "Password": pass,
                        "JoinDate": new Date()
                    }
                    if (pass === rpass) {

                        if (String(number).length === 10) {
                            SetLoding(true)
                            axios.post('http://127.0.0.1:8000/LoginDetails/', Data)
                                .then((d) => {
                                    navigate('/Login');
                                }).catch((e) => {
                                    alert("Please Try Again");
                                });
                        } else {

                            SetMPop(true)
                        }
                    } else {
                        setPPop(true)
                    }
                }

            }).catch((e) => {

            });


    }
    return (

        <>
            {Loding ? <>
                <div class="d-flex flex-column align-items-center col-12 100-vw 100-vh card " style={{ height: '100vh' }}>
                    <div class=" mt-auto mb-auto d-flex flex-row" role="status">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-border text-secondary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div></> : <>
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '500px', overflowX: 'hidden' }}>

                    <div class="login p-3 mt-auto mb-auto col-10 col-sm-8 col-md-6 col-lg-5 col-xl-3" style={{height:'450px'}}>
                           <div className='d-flex flex-row justify-content-center mb-3'> 
                           <small className='pw' >Create New Account</small>
                           </div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                HandleSubmit()

                            }} action="">
                            <input className='mt-2 text form-control' type="text" placeholder="FullName(Required)*" ref={Nref} id="username"/>
                            <input  type="email" className=' mt-3 form-control text' placeholder='Enter Email (Requred)*' ref={Eref} required />
                            <input min={0} type="number" className='mt-3 text form-control' value={RMn} onChange={(e) => {
                                        if (String(e.target.value).length <= 10) {
                                            SetRMn(e.target.value)
                                        }
                                    }} placeholder='Enter  Mobile Number(Requred)*' ref={Mref} required />
                             <input type="password" className='mt-3 password form-control' placeholder='Enter Password*' ref={Pref} required />
                             <input type="password" className=' mt-3 password form-control' placeholder='Enter again same password' ref={Rpref} required />
                            
                            <input type="submit" value="Sign In" className='btn text-light  mt-3 p-2 ml-auto mr-auto  submitt' />
                                
                               

                            </form>

                    </div>
                   
                  
                    
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
                                {PPop && <>

                                    <Modal show={PPop} >
                                        <Modal.Body>

                                            <div className="form-group">

                                                <div className='col-12 d-flex flex-row justify-content-end '>
                                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                                        setPPop(false)
                                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                                </div>
                                                <span className='text-info  pw'>Please Enter Password and Re Password Same</span>
                                            </div>



                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => { setPPop(false) }}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>}
                            </div>
                        </>}

                    </>
                    )
}

                    export default CreateNewAccount