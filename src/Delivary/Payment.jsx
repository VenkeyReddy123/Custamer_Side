import React, { useState, useEffect } from 'react'
// import { Mobile_Data } from '../Data/Mobile_Data'
import axios, { Axios } from 'axios'
import { json, useLocation, useNavigate } from 'react-router-dom'
import CuponPage from '../CuponPage'
import ResizedImage from '../HomeComponents/ResizedImage'
import Navbar from '../HomeComponents/Navbar'
import DSidebar from '../DSidebar'
import { Catigories } from '../Data'
import Footer from '../Footer'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    const Delivary = Location.state.Delivary
    const Total = Location.state.Total
    const [Cupon, setCupon] = useState([])
    const [PState, SetPaystate] = useState('')
    const [PayPop, setPayPop] = useState(false)
    const [HoverInd,SetHoverInd]=useState('')
    const [CodeDis,SetCodeDis]=useState(0)
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('INR')
    const [Response,SetResponse]=useState('')
    const [Ids,SetIds]=useState([])
    const handleOptionChange = (event) => {
        SetHoverInd(event.target.value)
        SetPaystate(event.target.value)
       
    };
    useEffect(()=>{
       const List= ArrList.map((e)=>{
            return e.Product_Name.id   
        })
        SetIds(List)

      
    },[])
    const BookOder = async (response) => {
        if ((PState.length == 0)&&(!response)) {
            setPayPop(true)
            return
        }
        let Status = null
        if (PState == 'Cash On Delevary') {
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
                "Delivary_Type": PState=='Cash On Delevary'?'Cash On Delevary':'Online',
                "Selling_Price": SPrice,
                "Code_Using": 0,
                "Size": Product.Size?Product.Size:'No'

            }



            await axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
              const response2=d.data
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
                    if(response){
                        const Data={
                        Product_Name:Ids.join('!'),
                        Product_Id:Product.Product_Name.id,
                        Order_Id:response.razorpay_order_id,
                        Payment_Id:response.razorpay_payment_id,
                        Custamer_Name:Number(localStorage.getItem('id')),
                        Order_Id2:response2.Order_Id
                      }
                      console.log(Data)
                      axios.post('http://127.0.0.1:8000/PaymentDetailsView/',Data).then((d)=>{
                
                      }).catch((e)=>{
                           console.log('sss')
                      })
                  }

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


        Item.map((Product) => {
            let SPrice = 0
            const SP = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
            SPrice = SP
            const Price = []
            const Code = []
            if (Cupon.Discount_Type.includes('Amount')) {
                Price.unshift(Math.trunc(SPrice - Cupon.Code_Off))
                Code.unshift(Cupon.Code_Off)
            }
            else {
                const Sp2 = Math.trunc((SPrice * (Cupon.Code_Off / 100)))
                Code.unshift(Math.trunc(SPrice * (Cupon.Code_Off / 100)))
                Price.unshift(SPrice-Sp2)
            }

            const Data = {
                "username": Product.Product_Name.username,
                "Product_Name": Product.Product_Name.id,
                "Payment_Status": Status,
                "Custamer_Name": email,
                "Delivary_Type": PState,
                "Selling_Price": Price[0],
                "Code_Using": Code[0],
                "Size": Product.Size?Product.Size:'No'

            }
         
            axios.post("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
                const response2=d.data
                let Total=null 
                if(Product.quantity>1){
                     let minus1=(Product.quantity-1)*SP  
                     let wcq=Price[0]
                     Total=minus1+wcq
                }else{
                    Total=Price[0]
                }

                const Data = {
                    "ImageUrl": Product.ImageUrl,
                    "username": d.data.username,
                    "Product_Name": Product.Product_Name.id,
                    "Full_Name": Add.Name,
                    "City": Add.City,
                    "Quantity": Product.quantity,
                    "Total_Amount": Total,
                    "Adress": JSON.stringify(Add),
                    "Custamer_Name": d.data.Custamer_Name,

                }
                axios.post("http://127.0.0.1:8000/CustamerDetails/", Data).then((d) => {
                    if(response){
                         const Data={
                         Product_Name:Ids.join('!'),
                         Product_Id:Product.Product_Name.id,
                         Order_Id:response.razorpay_order_id,
                         Payment_Id:response.razorpay_payment_id,
                         Custamer_Name:Number(localStorage.getItem('id')),
                         Order_Id2:response2.Order_Id
                       }
                       axios.post('http://127.0.0.1:8000/PaymentDetailsView/',Data).then((d)=>{
                 
                       }).catch((e)=>{
                            console.log('sss')
                       })
                   }
                })
                const Data3 = {
                    "pk": Product.Product_Name.id,
                    "Stack": Product.Product_Name.Stack - Product.quantity
                }
                axios.patch("http://127.0.0.1:8000/ProductDetails/", Data3).then((d) => {
                })
            }).catch((e) => {

            })
            const Data1 = {
                "Code_Name": Cupon.Code_Name,
                "Custamer_Name": Number(localStorage.getItem('id'))
            }
            axios.post("http://127.0.0.1:8000/CheckCodeDetails/", Data1).then((d) => {

            }).catch((e) => {

            })
        })
       
        const Total = [...Arr, ...Item]
       
        localStorage.setItem('TotalItems', Total.length)
        localStorage.setItem('TotalPrice', Price)
        localStorage.setItem('CodeDis', CodeDis)
        navigate('/Book', { state: { Items: { Total } } })


    }
    const UpdateOff = (Arr, type, Mess) => {


        if (type === 'Succ') {

            const Obj = Arr[0]
            setCupon(Arr[0])

            const Con = Arr[0].Condtion

            if (Con !== 'All') {
            
                const Fil_List = ArrList.filter((e) => {

                    return e.Product_Name.Category.toLowerCase().includes(Con.toLowerCase().slice(0, 4))
                })
                if (Fil_List.length == 0) {
                    setOff(`This Code Only allow ${Con}  Categories`)
                   
                } else {

                    if (Fil_List.length > 1) {
                        setOff(`You Won The Amount ${Obj.Code_Off} ${Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase()) ? 'Rupess' : '% Discount'} One  Product  `)
                        const Ind = Math.floor(Math.random() * Fil_List.length)
                        const Obj2 = Fil_List[Ind]
                        SetItem([Obj2])
                        const FilterData = ArrList.filter((e, ind) => {

                            return e.Product_Name.id != Obj2.Product_Name.id
                        })
                        setArr(FilterData)
                        setCChek(false)
                      
                      
                        if(Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase())){
                                   SetCodeDis(Obj.Code_Off)
                        
                                  
                            }else{
                            const Product=Obj2 
                            const Sp = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                            const Sp2 = Math.trunc((Sp* (Obj.Code_Off / 100)))
                            SetCodeDis(Sp2)
                         
                         
                            }
                    } else {
                    
                        if (ArrList.length > 1) {
                            setOff(`You Won The Amount ${Obj.Code_Off} ${Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase()) ? 'Rupess' : '% Discount'} On One  Product  `)
                            const Obj2 = Fil_List[0]
                            SetItem([Obj2])
                            const FilterData = ArrList.filter((e, ind) => {

                                return e.Product_Name.id != Obj2.Product_Name.id
                            })
                            setArr(FilterData)
                            setCChek(false)
                            
                            if(Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase())){
                                   SetCodeDis(Obj.Code_Off)
                              
                                  
                            }else{
                            const Product=Obj2 
                            const Sp = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                            const Sp2 = Math.trunc((Sp* (Obj.Code_Off / 100)))
                            SetCodeDis(Sp2)
                         
                         
                            }

                        } else {
                        
                            const Obj2 = Fil_List[0]   
                            setOff(`You Won The Amount ${Obj.Code_Off} ${Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase()) ? 'Rupess' : '% Discount'}  On  Product  `)
                             
                            setCChek(false)
                            if(Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase())){
                                   SetCodeDis(Obj.Code_Off)
                                
                                  
                            }else{
                            const Product=Obj2 
                            const Sp = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                            const Sp2 = Math.trunc((Sp* (Obj.Code_Off / 100)))
                           
                                   const saving=Sp2
                                   
                                   SetCodeDis(saving)
                                 
                         
                            }
                            SetItem(Fil_List)
                            setArr([])

                        }


                    }
                }

            } else {
               
                if (Obj.Discount_Type.toLowerCase().includes('Amount'.toLowerCase())) {
                  
                    SetCodeDis(Obj.Code_Off)
                
                    if (ArrList.length > 1) {
                        setOff(`You Won The Amount ${Obj.Code_Off} Rupees On One Product  `)
                        const Ind = Math.floor(Math.random() * ArrList.length)
                        const Obj2 = ArrList[Ind]
                        SetItem([Obj2])
                        const FilterData = ArrList.filter((e, ind) => {
                            return ind != Ind
                        })
                        setArr(FilterData)
                        setCChek(false)
                        
                      
                        
                    } else {

                        setOff(`You Won The Amount ${Obj.Code_Off} Rupees On  Product  `)
                        SetItem(ArrList)
                        
                        setCChek(false)
                        
                        setArr([])
                        
                    }
                } else {
                    
                    const Obj = Arr[0]
                    setCupon(Arr[0])
                    if (ArrList.length > 1) {
                        
                        setOff(`You Get The Off ${Obj.Code_Off} % On One Product`)
                        const Ind = Math.floor(Math.random() * ArrList.length)
                        const Obj2 = ArrList[Ind]
                        SetItem([Obj2])
                        const FilterData = ArrList.filter((e, ind) => {
                            return ind != Ind
                        })
                       
                        setArr(FilterData)
                        setCChek(false)
                        const Product=Obj2 
                      
                        const Sp = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                        const Sp2 = Math.trunc((Sp* (Obj.Code_Off / 100)))
                        SetCodeDis(Sp2)
                      
                        
                      
                    } else {
                        setOff(`You Get The Off ${Obj.Code_Off} % On One Product`)
                        const Product= ArrList[0]
                        const Sp = Math.trunc(Product.Product_Name.Price - (Product.Product_Name.Price * (Product.Product_Name.Discount / 100)))
                        const Sp2 = Math.trunc((Sp* (Obj.Code_Off / 100)))
                        SetCodeDis(Sp2)
                       
                        
                        SetItem(ArrList)
                        setArr([])
                        setCChek(false)
                    }
                }
            }
        }
        else if (type === 'Error') {

            setOff(Mess)
        }
        else if (type === 'Expi') {
            setOff("Code expired")
        }
        else {

        }
    }

    const CuponSending = () => {

        const filteredArray = ArrList.filter((e) => {
            return e.id !== Item.id;
        });
        setArr(filteredArray)

    }
    const [OnClick, setOnClick] = useState(false);
    const Callback = () => {
        setOnClick(!OnClick)

    }
    const [DSide, setDSide] = useState(false)
    const DisplySidebar = () => {

        setDSide(!DSide)
    }


    const handlepayment = async () => {
        SetPaystate('')
        SetHoverInd('PayNow')
        
        try {
            const orderResponse = await axios.post('http://127.0.0.1:8000/create_order/', {
                amount: (CodeDis > 0 ? Price - CodeDis : Price) * 100, // Ensure the amount is in smallest currency unit
                currency: currency
            });
        
            const { id: order_id, amount: order_amount, currency: order_currency } = orderResponse.data;
        
            const options = {
                key: 'rzp_test_pe1bONVKL9rAra', // Use your Razorpay test key
                amount: order_amount.toString(),
                currency: order_currency,
                name: 'Venkey',
                description: 'Test Transaction',
                order_id: order_id,
                handler: function (response) {
                    SetResponse(response)
                    BookOder(response)
               
                    
                   
                },
                prefill: {
                    name: 'Venkey Lawrence',
                    email: 'lawrencevekey12345@gmail.com',
                    contact: '8688479503'
                },
                notes: {
                    address: 'Razorpay Corporate office'
                },
                theme: {
                    color: '#3399cc'
                }
            };
        
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            alert('Error initiating payment');
            console.error('Error:', error);
        }
        
    }
   

    return (
        <>   <nav style={{ background: '#1F4C94' }} class="navbar navbar-expand-lg navbar-light  mt-2">

            <Navbar Callback={Callback} DisplySidebar={DisplySidebar} />
        </nav>
            <div className='d-flex  flex-column d-lg-flex flex-lg-row col-12' >
                <div className='col-sm-12 col-lg-8 d-flex flex-column'>

                    <div className='card col-12 mt-2' style={{ maxHeight: '100px' }}>
                        <div className='d-flex flex-column p-2'>
                            <span style={{ fontWeight: 'bold', color: 'black' }} className='pww mt-2'>Login<i class="fa-solid fa-check ml-2 text-success" style={{ fontWeight: 'bold' }}></i></span>
                            <span className='text-danger mt-2' style={{ fontWeight: 'bold' }}>Login Number <span className='text-primary' style={{ fontWeight: 'bold' }}>+91 {localStorage.getItem("mobile_number")}</span></span>
                        </div>
                    </div>

                    <div className='card col-12 mt-1 pw' style={{ maxHeight: '200px' }}>
                        <div className='d-flex flex-row justify-content-between '>
                            <span style={{ fontWeight: 'bold', color: 'black' }}>Delivery Adress<i class="fa-solid fa-check ml-2 text-success"></i></span>
                        </div>
                        <div className='d-flex flex-column flex-wrap pw' style={{ overflowX: 'hidden' }}>
                            <span className='text-primary'><span className='text-dark span '>Name:-</span>{Add.Name}</span>
                            <span><span className='span '> Mobile Number:-</span>{Add.Number}</span>
                            <span className='text-dark'>{Add.House}</span>
                            <span>{Add.Road}</span>
                            <span>{Add.State}{Add.City},Pin:-{Add.Pin}</span>
                        </div>
                    </div>
                    {/*  */}
                    <div >
                        <div className='col-12 d-flex flex-row mt-2 '>
                           <span className='ml-auto'><i class="fa-solid fa-money-bill mr-2 " style={{ fontSize: '25px',color:'dodgerblue',cursor:'pointer' }} onClick={() => {setCChek(!CChek)}}></i></span><span className='pww pw ' >Enter Cupon</span>
                        </div>
                        {CChek && <>
                            <CuponPage UpdateOff={UpdateOff} />
                        </>}

                    </div>
                    {/*  */}
                    {Off && <span className='ml-3  text-primary'>{Off}</span>}
                    <div className='col-12 mt-4 mb-5 ' >
                        <span  className='text-center text-success mt-4'>Payment Options</span >
                       
                        {/* <span  className='text-center text-success' style={{width:'50px',border:'2px solid red'}}></span > */}
                        <div className='row p-3' style={{ overflowX: 'hidden',rowGap:'20px',columnGap:'10px' }}>
                       

                                {/* <div className='card mt-2 d-felx flex-row' style={{border:`2px solid ${HoverInd=="Upi"?'skyblue':'lightgray'}`,width:'200px',height: '50px'}}>
                                   <input  className='ml-3' type="radio" name='py' value="Upi" onChange={handleOptionChange} />
                                   <label htmlFor="" className='mt-auto mb-auto ml-2 pw'>Upi</label>
                                  
                                </div>
                                <div className='card mt-2 d-felx flex-row'   style={{ border:`2px solid ${HoverInd=="Wallets"?'skyblue':'lightgray'}`,width:'200px',height: '50px' }}>
                                   <input  className='ml-3' type="radio" name="py" value="Wallets" onChange={handleOptionChange} />
                                   <label  className='mt-auto mb-auto ml-2 pw'  htmlFor="">Wallets</label>
                                </div>
                                <div className='card mt-2 d-felx flex-row'  style={{border:`2px solid ${HoverInd=="Credit/Debit"?'skyblue':'lightgray'}`, height: '50px',width:'200px' }}>
                                   <input  className='ml-3' type="radio" name='py' value="Credit/Debit" onChange={handleOptionChange} />
                                   <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Credet/Debit Card</label>
                                </div>
                                <div className='card mt-2 d-felx flex-row'  style={{border:`2px solid ${HoverInd=="Net Banking"?'skyblue':'lightgray'}`,  height: '50px',width:'200px'}}>
                                   <input  className='ml-3' type="radio" name="py" value="Net Banking" onChange={handleOptionChange} />
                                   <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Net Banking</label>
                                </div>
                                <div className='card mt-2 d-felx flex-row'  style={{ border:`2px solid ${HoverInd=="Cash On Delevary"?'skyblue':'lightgray'}`, height: '50px',width:'200px' }}>
                                   <input className='ml-3' type="radio" name="py" value="Cash On Delevary" onChange={handleOptionChange} />
                                   <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Cash On Deleivary</label>
                                </div> */}
                                
                                <div className='card mt-2 d-felx flex-row' style={{ border:`2px solid ${HoverInd=="Cash On Delevary"?'skyblue':'lightgray'}`, height: '50px',width:'200px' }}>
                                   <input checked={PState=='Cash On Delevary'} className='ml-3' type="radio" name="py" value="Cash On Delevary" onChange={handleOptionChange} />
                                   <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Cash On Deleivary</label>     
                                </div>
                                <div onClick={()=>{handlepayment()}}  className='card mt-2 d-felx flex-row' style={{ border:`2px solid ${HoverInd=="PayNow"?'skyblue':'lightgray'}`, height: '50px',width:'200px' }}>
                               
                                   <button   className='mt-auto mb-auto ml-2 pw btn ' >Pay Now</button>     
                                </div>
                        
                            {/* <form>
                                <div className='d-flex flex-row justify-content-bteween card '>
                                    <input type="radio" name='py' value="Upi" onChange={handleOptionChange} />
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
                            </form> */}
                        </div>
                    </div>

                </div>
                <div className='col-sm-12 col-lg-4 mt-3'>
                    <div className='card shadow-lg'>
                        <div className='card-footer'>
                            <span style={{fontWeight:'bold'}} >Price Details</span >
                        </div>
                        <div className='card-body'>
                            <div className='d-flex flex-row justify-content-between'>
                                <span style={{fontWeight:'bold'}} >Price</span >
                                <small><i class="fa-solid fa-indian-rupee-sign mt-1 mr-1" style={{ color: 'black' }}></i>{Price - Delivary}</small>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-4'>

                                {Delivary > 0 ? <>
                                    <span style={{fontWeight:'bold'}} >Delivery Charges({Delivary.length}items)</span >
                                    <div className='d-flex flex-row'>
                                        <span  className='text-success ml-3'>{Delivary}</span >
                                    </div>
                                </> : <>
                                    <span style={{fontWeight:'bold'}} >Delivery Charges</span >
                                    <div className='d-flex flex-row'>
                                        <del><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i></del>
                                        <span  className='text-success ml-3'>Free</span >
                                    </div>
                                </>}
                            </div>
                            {CodeDis>0&&<>
                                <div className='d-flex flex-row justify-content-between mt-3'>
                                <span style={{fontWeight:'bold'}} >Cupon Saving</span >
                                    <div className='d-flex flex-row'>
                                        <span  className='text-warnin ml-3'>{CodeDis}</span >
                                   </div>
                                </div>

                        </>}
                           

                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <span style={{fontWeight:'bold'}} >Total Items</span >
                                <small>{Total}</small>
                            </div>
                            <div className='d-flex flex-row justify-content-between mt-3'>
                                <span style={{fontWeight:'bold'}} >Total</span >
                                <small><i class="fa-solid fa-indian-rupee-sign mt-1 " style={{ color: 'black' }}></i>{CodeDis>0?<>{Price-CodeDis}</>:<>{Price}</>}</small>
                            </div>
                        </div>
                       
                        <div className='card-footer'>
                            <div className='d-flex flex-row justify-content-center mt-3'>
                                <span className='text-success' >Your Total Saving For This Order</span> <span><i class="fa-solid fa-indian-rupee-sign  ml-1 text-primary " style={{ color: 'black' }}></i></span><span className='text-success ml-1'>{Saving+CodeDis}</span>
                            </div>
                        </div>
                    </div>
                    {Click == 0 ? <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3`} onClick={() => {
                                setClick(Click + 1)
                                BookOder()
                            }}   >Book</button>
                        </div>
                    </> : <>
                        <div className={`mt-3 text-center`}>

                            <button type='button' className={`btn btn-danger ml-3 disabled`} onClick={() => {
                                BookOder()
                            }}   >Book</button>
                        </div>
                    </>}
                </div>

            </div>
            <div className='mt-3 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >

            </div>

            <div className={`bg-light ${DSide ? 'dside' : 'ddside'}`} style={{ height: '100%', position: 'absolute', top: '0px', right: '0px', overflow: 'hidden' }}>
                <DSidebar DisplySidebar={DisplySidebar} Value={DSide} />
            </div>
           
            {PayPop && <>
                <Modal show={PayPop} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark" onClick={() => {
                                    setPayPop(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-danger  pw'>Please Select Payment Option</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setPayPop(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>}
            
            {OnClick && <div className='col-sm-11 col-md-6 col-lg-4' style={{ background: '#2457AA', position: 'absolute', top: '10px', left: '-20px', overflow: 'hidden' }} >
                <div className='col-12 d-flex flex-row justify-content-end mt-3  mb-2'>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {

                        setOnClick(false)
                    }} style={{ fontSize: '25px', borderRadius: '20px' }}></i>

                </div>
                {Catigories.slice().map((e, index) => {
                    return (
                        <>
                            {index == 0 && <>
                                <div key={index} className='card-footer text-start ml-2' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s`, visibility: 'hidden' }} >

                                    <div className='d-flex flex-row'>
                                        <i className="fa-solid fa-arrow-right mt-2  mr-3 text-light" style={{ fontSize: '30px' }}></i>
                                        <h5 className='mt-2 text-light' onClick={() => {

                                            navigate("/Product", { state: { Cat: e } })
                                        }}>{e}</h5>
                                    </div>
                                </div>
                            </>}
                            <div key={index} className='card-footer text-start ml-2 cnameback' style={{ height: '60px', background: '#2457AA', cursor: 'pointer', transitionDelay: `${index * 0.1}s` }} >

                                <div className='d-flex flex-row cnames'>
                                    <i className="fa-solid fa-arrow-right mt-2  mr-3 t" style={{ fontSize: '30px' }}></i>
                                    <h5 className='mt-2 ' onClick={() => {

                                        navigate("/Product", { state: { Cat: e } })
                                    }}>{e}</h5>
                                </div>
                            </div>

                        </>

                    )
                })}
            </div>}
            <div className='mt-5 d-flex flex-column justify-content-start' style={{ overflowX: 'hidden' }} >
                <Footer />
            </div>

        </>

    )
}

export default Payment




// <div className='card'>
// <div className='col-12 p-4'>

// <div className='col-12  col-md-8 col-lg-7 d-flex flex-column'>
//   <span className='ml-auto'><i class="fa-solid fa-money-bill mr-2 " style={{ fontSize: '25px',color:'dodgerblue',cursor:'pointer' }} onClick={() => {setCChek(!CChek)}}></i> <span className='pww pw mr-2  ' >Enter Cupon</span></span>
//   {CChek && <>
//    <CuponPage UpdateOff={UpdateOff} />
// </>}
// {Off && <span className='ml-3  text-success'>{Off}</span>}
// </div>
// </div>
// <div className='col-12   p-4    ' style={{maxHeight:'450px'}} >
    
   
// <span  className='text-center text-success'>Payment Options</span >
// <div className='d-flex flex-column p-4 card ' style={{ overflowX: 'hidden', }}>
//    <form className=' row' style={{rowGap:'20px',columnGap:'20px'}} action="">

//        <div className='card mt-2 d-felx flex-row' onClick={()=>{SetHoverInd('Upi')}} style={{borderTop:`2px solid ${HoverInd=="Upi"?'skyblue':'lightgray'}`,width:'200px'}}>
//           <input  className='ml-3' type="radio" name='py' value="Upi" onChange={handleOptionChange} />
//           <label htmlFor="" className='mt-auto mb-auto ml-2 pw'>Upi</label>
         
//        </div>
//        <div className='card mt-2 d-felx flex-row'  onClick={()=>{SetHoverInd('Wallets')}} style={{ borderTop:`2px solid ${HoverInd=="Wallets"?'skyblue':'lightgray'}`, borderBottom:`2px solid ${HoverInd=="Wallets"?'skyblue':'lightgray'}`,height: '50px' ,borderLeft:'none',borderRight:'none',width:'200px' }}>
//           <input  className='ml-3' type="radio" name="py" value="Wallets" onChange={handleOptionChange} />
//           <label  className='mt-auto mb-auto ml-2 pw'  htmlFor="">Wallets</label>
//        </div>
//        <div className='card mt-2 d-felx flex-row' onClick={()=>{SetHoverInd('Credit/Debit')}} style={{borderTop:`2px solid ${HoverInd=="Credit/Debit"?'skyblue':'lightgray'}`, borderBottom:`2px solid ${HoverInd=="Credit/Debit"?'skyblue':'lightgray'}`, height: '50px',borderLeft:'none',borderRight:'none',width:'200px' }}>
//           <input  className='ml-3' type="radio" name='py' value="Credit/Debit" onChange={handleOptionChange} />
//           <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Credet/Debit Card</label>
//        </div>
//        <div className='card mt-2 d-felx flex-row' onClick={()=>{SetHoverInd('Net Banking')}} style={{borderTop:`2px solid ${HoverInd=="Net Banking"?'skyblue':'lightgray'}`, borderBottom:`2px solid ${HoverInd=="Net Banking"?'skyblue':'lightgray'}`, height: '50px',borderLeft:'none',borderRight:'none',width:'200px'}}>
//           <input  className='ml-3' type="radio" name="py" value="Net Banking" onChange={handleOptionChange} />
//           <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Net Banking</label>
//        </div>
//        <div className='card mt-2 d-felx flex-row' onClick={()=>{SetHoverInd('Cash On Delevary')}} style={{ borderTop:`2px solid ${HoverInd=="Cash On Delevary"?'skyblue':'lightgray'}`, borderBottom:`2px solid ${HoverInd=="Cash On Delevary"?'skyblue':'lightgray'}`,height: '50px',borderLeft:'none',borderRight:'none',width:'200px' }}>
//           <input className='ml-3' type="radio" name="py" value="Cash On Delevary" onChange={handleOptionChange} />
//           <label  className='mt-auto mb-auto ml-2 pw' htmlFor="">Cash On Deleivary</label>
//        </div>
//    </form>
   
// </div>
// </div>
// </div>