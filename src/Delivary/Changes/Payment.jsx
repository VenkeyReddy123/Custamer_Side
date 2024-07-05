import React, { useState } from 'react'
// import { Mobile_Data } from '../Data/Mobile_Data'
import axios, { Axios } from 'axios'
import { json, useLocation, useNavigate } from 'react-router-dom'
import CuponPage from '../CuponPage'
import ResizedImage from '../HomeComponents/ResizedImage'
import Navbar from '../HomeComponents/Navbar'
class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };

    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);

        return <span>{truncatedText}</span>;
    }
}

const Payment = () => {
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    const Location = useLocation()
    const [CChek, setCChek] = useState(false)
    const [Off, setOff] = useState(null)
    const [Code, SetCode] = useState(null)
    const [Val, setVal] = useState(false)
    const [Click, setClick] = useState(false)
    const [Select, SetSelect] = useState(false)
    const [Item, SetItem] = useState([])
    const storedAddress = localStorage.getItem('Address2');
    const Add = JSON.parse(storedAddress)
    const ArrList = Location.state.ArrList
    const [Arr, setArr] = useState(ArrList)
    const Price = Location.state.Price
    const Saving = Location.state.Saving
    const [Cupon, setCupon] = useState([])
    console.log(Saving)
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }
    let PayOp = null

    const handleOptionChange = (event) => {
        PayOp = event.target.value
    };
    const BookOder = async () => {
        if (PayOp) {

        }
        else {
            alert('Select Payment Option')
            return
        }
        let Status = null
        if (PayOp == 'Cash On Delevary') {
            Status = 'Pending'
        }
        else {
            Status = 'Compleate'
        }

        Arr.map(async (Product) => {
            const SPrice = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
            const Data = {
                "username": Product.Product_Name.username,
                "Product_Name": Product.Product_Name.id,
                "Payment_Status": Status,
                "Custamer_Name": email,
                "Delivary_Type": PayOp,
                "Selling_Price": SPrice,
                "Code_Using": 0,

            }
            await axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
                const Data = {
                    "ImageUrl": Product.ImageUrl,
                    "username": d.data.username,
                    "Product_Name": Product.Product_Name.id,
                    "Full_Name": Add.Name,
                    "City": Add.City,
                    "Quantity": Product.quantity,
                    "Total_Amount": Product.quantity * SPrice,
                    "Adress": JSON.stringify(Add),
                    "Custamer_Name": d.data.Custamer_Name,

                }
                axios.post("http://127.0.0.1:8000/CustamerDetails/", Data).then((d) => {


                })
                const Data3 = {
                    "pk": Product.Product_Name.id,
                    "Stack": Product.Product_Name.Stack - Product.quantity
                }
                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data3).then((e) => {

                })


            }).catch((e) => {
                console.log('error')
            })

        })
        const Item2 = [Item]
        Item2.map((Product) => {
            let SPrice = 0
            try {

                const SP = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                SPrice = SP
            } catch {
                console.log(SPrice)
                return

            }
            const Price = []
            const Code = []
            if (Cupon.Discount_Type.includes('Fixed')) {
                Price.unshift(SPrice - Cupon.Code_Off)
                Code.unshift(Cupon.Code_Off)
            }
            else {
                const Sp2 = Math.trunc(SPrice - (SPrice * (Cupon.Code_Off / 100)))
                Code.unshift(SPrice * (Cupon.Code_Off / 100))
                Price.unshift(Sp2)


            }
            const Data = {
                "username": Product.Product_Name.username,
                "Product_Name": Product.Product_Name.id,
                "Payment_Status": Status,
                "Custamer_Name": email,
                "Delivary_Type": PayOp,
                "Selling_Price": Price[0],
                "Code_Using": Code[0],

            }
            axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
                const Data = {
                    "ImageUrl": Product.ImageUrl,
                    "username": d.data.username,
                    "Product_Name": Product.Product_Name.id,
                    "Full_Name": Add.Name,
                    "City": Add.City,
                    "Quantity": Product.quantity,
                    "Total_Amount": Product.quantity * SPrice,
                    "Adress": JSON.stringify(Add),
                    "Custamer_Name": d.data.Custamer_Name,

                }
                axios.post("http://127.0.0.1:8000/CustamerDetails/", Data).then((d) => {
                })
                const Data3 = {
                    "pk": Product.Product_Name.id,
                    "Stack": Product.Product_Name.Stack - Product.quantity
                }
                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data3).then((d) => {
                    alert(' Code Success')
                })
            }).catch((e) => {
                console.log('Error')
            })
            const Data1 = {
                "Code_Name": Cupon.Code_Name,
                "Custamer_Name": Number(localStorage.getItem('id'))
            }
            axios.post("http://127.0.0.1:8000/CheckCodeDetails/", Data1).then((d) => {

            }).catch((e) => {
                alert("Code Error")
            })
        })

        navigate('/Book')



    }
    const UpdateOff = (Arr, type) => {
        if (type === 'Succ') {
            console.log(Arr[0])
            const Obj = Arr[0]
            setCupon(Arr[0])
            if (Obj.Discount_Type.includes('Fixed')) {
                setOff(`You Won The Amount ${Obj.Code_Off} Rupees On One Product  `)
                setCChek(!CChek)
                if (ArrList.length > 1) {
                    setClick(!Click)
                }
                else {
                    SetItem(ArrList[0])
                    setArr([])
                }
            }
            else {
                setOff(`You Get The Off ${Obj.Code_Off} % On One Product`)
                setCChek(!CChek)
                if (ArrList.length > 1) {
                    setClick(!Click)
                }
                else {
                    SetItem(ArrList[0])
                    setArr([])
                }
            }
        }
        else {
            setOff('Code Limit Reached / U Alredy Used ')
        }
    }

    const CuponSending = () => {
        setClick(!Click)
        const filteredArray = ArrList.filter((e) => {
            return e.id !== Item.id;
        });
        setArr(filteredArray)

    }

    return (
        <>
            <nav style={{ background: '#1F4C94', overflow: 'hidden' }} class="navbar navbar-expand-lg navbar-light  mt-2">

                <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
            </nav>
            <div className='d-flex  flex-column d-lg-flex flex-lg-row col-12'>
                <div className='col-sm-12 col-lg-8 d-flex flex-column'>

                    <div className='card col-12 mt-2' style={{ maxHeight: '100px' }}>
                        <div className='d-flex flex-column'>
                            <h2>Login<i class="fa-solid fa-check ml-2 text-success"></i></h2>
                            <span className='mb-2 text-danger' style={{ fontWeight: 'bold' }}>Flipcard Custemer <span className='text-primary' style={{ fontWeight: 'bold' }}>+91{Add.Number}</span></span>
                        </div>
                    </div>

                    <div className='card col-12 mt-2  ' style={{ maxHeight: '200px' }}>
                        <div className='d-flex flex-row justify-content-between '>
                            <h2>Delivery Adress<i class="fa-solid fa-check ml-2 text-success"></i></h2>
                        </div>
                        <div className='d-flex flex-column flex-wrap' style={{ overflowX: 'hidden' }}>
                            <span style={{ fontWeight: 'bold' }} className='text-primary'>{Add.Name}</span>
                            <span style={{ fontWeight: 'bold' }} className='text-dark'>{Add.House}{Add.Road}<br></br>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                        </div>
                    </div>
                    {/*  */}
                    <div >
                        <div style={{ textAlign: 'end' }}>
                            <i class="fa-solid fa-plus mt-2" style={{ fontSize: '25px' }} onClick={() => { setCChek(!CChek) }} ></i>Enter Coupon Code
                        </div>
                        {CChek && <>
                            
                            <CuponPage UpdateOff={UpdateOff} />
                        </>}

                    </div>
                    {/*  */}
                    {Off && <span className='ml-3 text-success'>{Off}</span>}
                    {/* insied Payment */}
                    <div className='card col-12 mt-2 ' style={{ maxHeight: '300px', background: '#F5F7FA' }} >
                        <h2 className='text-center'>Payment Options</h2>
                        <div className='d-flex flex-column flex-wrap card-body' style={{ overflowX: 'hidden', }}>
                            <form>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name="py" value="Upi" onChange={handleOptionChange} />
                                    <label htmlFor="">Upi</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name="py" value="Wallets" onChange={handleOptionChange} />
                                    <label htmlFor="">Wallets</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name='py' value="Credit/Debit" onChange={handleOptionChange} />
                                    <label htmlFor="">Credet/Debit Card</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2'>
                                    <input type="radio" name="py" value="Net Banking" onChange={handleOptionChange} />
                                    <label htmlFor="">Net Banking</label>
                                </div>
                                <div className='d-flex flex-row justify-content-bteween card mt-2 '>
                                    <input type="radio" name="py" value="Cash On Delevary" onChange={handleOptionChange} />
                                    <label htmlFor="">Cash On Deleivary</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* ROww */}
                <div className='col-sm-12 col-lg-4 mt-3'>
                    {/* <div className='card shadow-lg'>
                            <div className='card-footer'>
                                <span  >Price Details</span  >
                            </div>
                            <div className='card-body'>
                                <div className='d-flex flex-row justify-content-between'>
                                    <span  >Price(1 Item)</span  >
                                    <h4><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{quantity * Product.Product_Name.Price}</h4>
                                </div>
                                <div className='d-flex flex-row justify-content-between mt-4'>
                                    <span  >Delivery Charges</span  >
                                    <div className='d-flex flex-row'>
                                        <del><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>50</del>
                                        <span   className='text-success ml-3'>Free</span  >
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-between mt-3'>
                                    <span  >Quantities</span  >
                                    <h4>{quantity}</h4>
                                </div>
                                {Off&&<>
                                    <div className='d-flex flex-row justify-content-between mt-3'>
                                    <span  >CashBack</span  >
                                    <h4>{Off}</h4>
                                </div>
                                </>}
                                <div className='d-flex flex-row justify-content-between mt-3'>
                                    <span  >Total</span  >
                                    <h4><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{Off ? (
    <>
        {quantity * (Product.Product_Name.Price - Off)}
    </>
) : (
    <>
        {quantity * Product.Product_Name.Price}
    </>
)}
</h4>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='d-flex flex-row justify-content-center mt-3'>

                                    <span className='text-success' style={{ fontWeight: 'bold' }}>Your Total Saving For This Order<i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{quantity * Product.Product_Name.Price}</span>
                                </div>
                            </div>
                        </div> */}
                    {Click == 0 ? <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3`} onClick={() => {
                                setClick(Click + 1)
                                BookOder()
                            }}   >Click To Book</button>
                        </div>
                    </> : <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3 disabled`} onClick={() => {
                                BookOder()
                            }}   >Click To Book</button>
                        </div>
                    </>}

                </div>
                {Click && <>
                    <div className='card-body shadow-lg' style={{ position: 'absolute', top: '50px', right: '50px', background: 'white', borderRadius: '30px' }}>

                        <span className='' style={{ fontSize: '20px', fontWeight: 'bold' }}>Which Product You Need To Apply Cupon Code Offer</span>
                        {ArrList.map((e, ind) => {
                            return (
                                <>

                                    <div className='d-flex flex-row mt-1'>
                                        <input type="radio" name='pro' onClick={() => {
                                            SetItem(e)

                                        }} /><div className='d-flex flex-row'>
                                            <img className='' src={e.ImageUrl} alt="" width={'50px'} height={'60px'} style={{ borderRadius: '5px' }} />
                                            {/* <ResizedImage imageUrl={e.imageUrl} width={'50px'} height={'50px'}  /> */}
                                            <span className='ml-2' style={{ fontSize: '20px', fontWeight: 'bold' }}><TruncateWords text={e.Product_Name.Product_Name} maxLength={10} /></span><br></br>

                                        </div>

                                    </div>


                                </>
                            )
                        })}
                        <button className='btn btn-warning mt-1' onClick={() => { CuponSending() }}>Done</button>

                    </div>

                </>}
            </div>
        </>
    )
}

export default Payment