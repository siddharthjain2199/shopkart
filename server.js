import env from "react-dotenv";
const express = require('express');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
const stripe = require('stripe')

(env.skKey);

const app = express();
app.use(cors());

const path = require('path');

const port = process.env.PORT || 8080; 

if(process.env.NODE_ENV==='production'){
    app.use(express.static('build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to ecommerce store');
})

app.post('/checkout', async(req,res)=>{
    let error;
    let status;
    try {
        const {cart, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: cart.totalPrice*100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Product description here',
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip 
                }
            }
        },{idempotencyKey: key})
        status = "success";
    } catch (error) {
        console.log(error);
        status="error"
    }
    res.json({status});
})

app.listen(port,()=>{
    console.log('Your app is running on port no ',port)
});