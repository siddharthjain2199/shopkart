import React from 'react'

const IndividualProduct = ({ individualProduct, addToCart }) => {
    // console.log(individualProduct);
    const handleAddToCart= ()=>{
        addToCart(individualProduct);
    }
    return (
        <>
            <div className="col">
                <div className="card mb-3" style={{ width: '18rem' }}>
                    <img src={individualProduct.url} className="card-img-top" alt="..." style={{ width: "100%", height: "300px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{individualProduct.productName}</h5>
                        <p className="card-text">{individualProduct.productDetail}</p>
                        <p className="card-text">{individualProduct.productPrice}</p>
                        <div className="btn btn-primary" onClick={handleAddToCart}>Add To Kart</div>
                    </div>
                </div>
            </div>
        </>
    )}
export default IndividualProduct