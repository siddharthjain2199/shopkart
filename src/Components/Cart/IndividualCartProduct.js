import React from 'react'
import { Icon } from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus'
import { minus } from 'react-icons-kit/feather/minus'
import { auth, fs } from '../../Config/Config';

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }) => {
    const handleCartProductIncrease = ()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease = ()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete =()=>{
        if (window.confirm("Are you sure")){
        auth.onAuthStateChanged((user) => {
            if (user) {
              fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(() => {
                console.log('Delete successfully');
              })
            } else {
              console.log("User has not logged in to delete")
            }
          })
        } 
        else{
            console.log('cancel')
        }
    }
    return (
        <div className="col">
            <div className='product'>
                <div className='product-img'>
                    <img src={cartProduct.url} alt="product-img" />
                </div>
                <div className='product-text title'>{cartProduct.productName}</div>
                <div className='product-text description'>{cartProduct.productDetail}</div>
                <div className='product-text price'>₹ {cartProduct.productPrice}</div>
                <span>Quantity</span>
                <div className='product-text quantity-box'>
                    <div className='action-btns minus' >
                        <Icon icon={minus} size={20} onClick={handleCartProductDecrease}/>
                    </div>
                    <div>{cartProduct.qty}</div>
                    <div className='action-btns plus' >
                        <Icon icon={plus} size={20} onClick={handleCartProductIncrease}/>
                    </div>
                </div>
                <div className='product-text cart-price'>₹ {cartProduct.TotalProductPrice}</div>
                <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>
            </div>
        </div>
    )
}
