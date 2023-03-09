import React, { useState } from 'react'

const SHORTEN_LIMIT = 9;
const IndividualProduct = ({ individualProduct, addToCart }) => {
    // console.log(individualProduct);
    const handleAddToCart = () => {
        addToCart(individualProduct);
    }
    const [shortened, setShortened] = useState(true);
    const text = individualProduct.productDetail;

    const words = text.split(' ');
    const shortText = words.slice(0, SHORTEN_LIMIT).join(' ');
    const remainingText = words.slice(SHORTEN_LIMIT).join(' ');
    return (
        <>
            <div className="col">
                <div className="card mb-3" style={{ width: '14rem' }}>
                    <img src={individualProduct.url} className="card-img-top" alt={individualProduct.productName} style={{ width: "100%", height: "300px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{individualProduct.productName}</h5>
                        <p className="card-text">₹{individualProduct.productPrice}/-</p>
                        <p className="card-text">
                            {shortened ? shortText : text}
                            {remainingText && (
                                <button className='btn btn-link' onClick={() => setShortened(!shortened)}>
                                    {shortened ? 'read more' : 'read less'}
                                </button>
                            )}
                        </p>
                        <div className="btn btn-dark" onClick={handleAddToCart}>Add To Kart</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndividualProduct