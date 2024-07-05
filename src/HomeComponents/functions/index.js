// functions/index.js

const functions = require('firebase-functions');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

exports.createRazorpayOrder = functions.https.onRequest(async (req, res) => {
    const options = {
        amount: 100, // amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: 1
    };
    try {
        const response = await razorpay.orders.create(options);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating Razorpay order.' });
    }
});
