import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, fs } from '../Config/Config';
import Products from './Products'

const Home = (props) => {

  // getting current user id
  function GetUserId() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      })
    }, [])
    return uid;
  }

  const uid = GetUserId();
  const navigate = useNavigate();
  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection('Products').get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data
      })
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray)
      }
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  const addToCart = (product) => {
    let Product;
    if (uid !== null) {
      // console.log(product);
      Product=product;
      Product['qty']=1;
      Product['TotalProductPrice']=Product.qty*Product.productPrice;
      fs.collection('Cart ' +uid).doc(Product.ID).set(Product).then(()=>{
        console.log('successfully added to cart');
      })
    } else {
      navigate("/login");
    }
  }
  return (
    <div className='mt-3'>
      {/* <Products/> */}
      {products.length > 0 && (
        <div className="container">
          <h1 className='text-center'>Products</h1>
          <div className="row">
            <Products products={products} addToCart={addToCart} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container">
          Please Wait....
        </div>
      )}
    </div>
  )
}

export default Home