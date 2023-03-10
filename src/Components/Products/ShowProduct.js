import React from 'react'
import IndividualProduct from './IndividualProduct'

function ShowProduct({products, addToCart}) {
  // console.log(products)
  return products.map((individualProduct)=> 
    <IndividualProduct key={individualProduct.ID} individualProduct={individualProduct} addToCart={addToCart}/>
  )
}

export default ShowProduct
