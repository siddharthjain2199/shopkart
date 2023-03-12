import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, fs } from '../../Config/Config';
import ShowProduct from '../Products/ShowProduct'
import { IndividualFilteredProduct } from './IndividualFilteredProduct';

export const Products = () => {

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
      Product = product;
      Product['qty'] = 1;
      Product['TotalProductPrice'] = Product.qty * Product.productPrice;
      fs.collection('Cart ' + uid).doc(Product.ID).set(Product).then(() => {
        console.log('successfully added to cart');
      })
    } else {
      navigate("/login");
    }
  }


  // categories list rendering using span tag
  const [spans] = useState([
    { id: 'ElectronicDevices', text: 'Electronic Devices' },
    { id: 'MobileAccessories', text: 'Mobile Accessories' },
    { id: 'TVAndHomeAppliances', text: 'TV & Home Appliances' },
    { id: 'SportsAndOutdoors', text: 'Sports & outdoors' },
    { id: 'HealthAndBeauty', text: 'Health & Beauty' },
    { id: 'HomeAndLifestyle', text: 'Home & Lifestyle' },
    { id: 'MensFashion', text: `Men's Fashion` },
    { id: 'WatchesBagsAndJewellery', text: `Watches, bags & Jewellery` },
    { id: 'Groceries', text: 'Groceries' },
  ])
  // active class state
  const [active, setActive] = useState('');

  // category state
  const [category, setCategory] = useState('');

  // handle change ... it will set category and active states
  const handleChange = (individualSpan) => {
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  }
  //fitered products state 
  const [filteredProducts, setFilteredProducts] = useState([]);

  // filter function
  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    }
    else {
      console.log('no products to filter')
    }
  }

  // return to all products
  const returntoAllProducts = () => {
    setActive('');
    setCategory('');
    setFilteredProducts([]);
  }
  return (
    <div>
      {/* <Products/> */}
      {/* {products.length > 0 && (
      <div className="container">
        <h1 className='text-center'>Products</h1>
        <hr></hr>
        <div className="row">
          <ShowProduct products={products} addToCart={addToCart} />
        </div>
      </div>
    )}
    {products.length < 1 && (
      <div className="container">
        Please Wait....
      </div>
    )} */}
      <div className="container filter-products-main-box">
        <div className="filter-box">
          <h6>Filter by category</h6>
          {spans.map((individualSpan, index) => (
            <span key={index} id={individualSpan.id}
              onClick={() => handleChange(individualSpan)}
              className={individualSpan.id === active ? active : 'deactive'}>{individualSpan.text}</span>
          ))}
        </div>
        {filteredProducts.length > 0 && (
          <div className='my-products'>
            <h1 className='text-center'>{category}</h1>
            <button className="btn btn-link" onClick={returntoAllProducts}>Return to All Products</button>
            <div className='products-box'>
              {filteredProducts.map(individualFilteredProduct => (
                <IndividualFilteredProduct key={individualFilteredProduct.ID}
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
        {filteredProducts.length < 1 && (
          <>
            {products.length > 0 && (
              <div className='my-products'>
                <h1 className='text-center'>All Products</h1>
                <div className='products-box'>
                  <ShowProduct products={products} addToCart={addToCart} />
                </div>
              </div>
            )}
            {products.length < 1 && (
              <div className='my-products please-wait'>Please wait...</div>
            )}
          </>
        )}
      </div>

    </div>
  )
}
