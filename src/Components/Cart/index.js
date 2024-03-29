import React, { useEffect, useState } from 'react'
import { auth, fs } from '../../Config/Config';
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal';

toast.configure();
function Cart() {
  // show modal state
  const [showModal, setShowModal] = useState(false);

  // trigger modal
  const triggerModal = () => {
    setShowModal(true);
  }

  // hide modal
  const hideModal = () => {
    setShowModal(false);
  }

  // state of cart products
  const [cartProducts, setCartProducts] = useState([]);
  // getting cart products from firestore collection and updating the state
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }))
          setCartProducts(newCartProduct);
        })
      } else {
        console.log('User is not signed in to retrieve cart')
        navigate('/login')
      }
    })
  }, )

  // console.log(cartProducts)
  // Global Variable
  let Product;

  //cart product increase function
  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.productPrice;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
          console.log('increament added');
        })
      } else {
        console.log("User has not logged in to increment")
        navigate('/login')
      }
    })
  }

  //cart product increase function
  const cartProductDecrease = (cartProduct) => {
    // console.log(cartProduct);
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.productPrice;
      // updating in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
            console.log('Decrement succesfully');
          })
        } else {
          console.log("User has not logged in to decrement")
        navigate('/login')
        }
      })
    } else {
      // console.log('less then zero')
    }
  }

  // getting the qty  from cartProducts in a seperate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  })

  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // getting the TotalProductPrice  from cartProducts in a seperate array
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  })

  // reducing the qty in a single value
  const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  const pkKey = process.env.REACT_APP_pkKey

  const navigate = useNavigate();
  const handleToken = async (token) => {
    console.log(token);
    const cart = { name: 'All Products', totalPrice }
    const response = await axios.post(process.env.checkoutURL, {
      token,
      cart
    })
    // console.log(response)
    let { status } = response.data;
    // console.log(status)
    if (status === 'success') {
        navigate('/myorders');
       toast.success('Your order has been placed successfully', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      const uid = auth.currentUser.uid;
      const carts = await fs.collection('Cart ' + uid).get();
      for (var snap of carts.docs) {
        fs.collection('Cart ' + uid).doc(snap.id).delete();
      }
    } else {
      alert('Something went wrong in checkout');
    }
  }
  return (
    <div>
      {cartProducts.length > 0 &&
        <div className="container">
          <h1 className='text-center'>Cart</h1>
          <div className="product-box">
            <div className="row">
              <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease} />
            </div>
          </div>
          <div className='summary-box'>
            <h5>Cart Summary</h5>
            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>₹ {totalPrice}</span>
            </div>
            <br></br>
            <StripeCheckout
                          stripeKey = {pkKey}
                          token = {handleToken}
                          billingAddress
                          shippingAddress
                          name='All Products'
                          amount={totalPrice * 100}
                        ></StripeCheckout>
                           <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>
            <button className='btn btn-secondary btn-md'
              onClick={() => triggerModal()}>Cash on Delivery</button>
          </div>
        </div>
      }
      {cartProducts.length < 1 &&
        <div className="container-fluid">No products to show</div>
      }

      {showModal === true && (
        <Modal TotalPrice={totalPrice} totalQty={totalQty}
          hideModal={hideModal}
        />
      )}
    </div>
  )
}

export default Cart
