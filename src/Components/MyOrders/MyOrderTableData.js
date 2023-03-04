import React from 'react'

export const MyOrderTableData = ({ myOrderProduct }) => {
    return (
        <tr>
            <th>{myOrderProduct.OrderID}</th>
            {myOrderProduct.AfterCartSave.map((reptile) => (
                <td className='row'>
                    <div className='d-flex'>
                        <div className="card">
                            <img src={reptile.url} className="card-img-top" alt="..." style={{ width: "6em", height: "8em" }} />
                        </div>
                        <div className="card-body mx-2 w-50">
                            <h5 className="card-title">{reptile.productName}</h5>
                            <p className="card-text">{reptile.productDetail}</p>
                            <p className="card-text">₹{reptile.productPrice}/-</p>
                            <p className="card-text">Quantity: {reptile.qty}</p>
                        </div>
                    </div>
                </td>
            ))}
            <td>{myOrderProduct.BuyerInfo.CartQty}</td>
            <td>{myOrderProduct.OrderDate}</td>
            <td>{myOrderProduct.PaymentMode}</td>
            <td>₹{myOrderProduct.BuyerInfo.CartPrice}/-</td>
        </tr>
    )
}
