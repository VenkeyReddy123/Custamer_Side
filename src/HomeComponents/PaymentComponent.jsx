import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PaymentComponent = () => {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('INR')
    const handlepayment = async () => {
        try {
            const orderResponse = await axios.post('http://localhost:8000/create_order/', {
                amount: amount * 100,
                currency: currency
            });
            const { id: order_id, amount: order_amount, currency: order_currency } = orderResponse.data
            const options = {
                key: 'rzp_test_tBzKSj2oTCRoU1',
                amount: order_amount.toString(),
                currency: order_currency,
                name: 'Venkey',
                description: 'Test_Transaction',
                order_id: order_id,
                handler: function (response) {
                    //; // Log the entire response for inspection
                    // console.log('Order ID:', order_id); // Log the order ID
                    // console.log('Payment ID:', response.razorpay_payment_id); // Log the payment ID
                    // console.log('Order ID:', response.razorpay_order_id); // Log the order ID from the response
                    // console.log('Signature:', response.razorpay_signature); // Log the signature
            
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                },
                prefill: {
                    name: 'VenkeyLawrence',
                    email: 'lawrencevekey12345@gmail.com',
                    contact: '8688479503'
                },
                notes: {
                    adress: 'Razorpay Corporate office'
                },
                theme: {
                    color: '#3399cc'
                }
            };
            const rzp1 = new window.Razorpay(options)
            rzp1.open();
        } catch {
            alert('error')
        }
    }
    return(
        <>
          <div>
              <input type="text" value={amount} onChange={(e)=>{setAmount(e.target.value)}} placeholder='Enter Amount' />
              <select value={currency} onChange={(e)=>{setCurrency(e.target.value)}}>
                <option value="INR">INR</option>
              </select>
              <button onClick={handlepayment}>Pay Now</button>
          </div>
        </>
    )
}
export default PaymentComponent