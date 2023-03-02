import React from 'react'

export const MyOrderTableData = ({myOrderProduct}) => {
    
    return (
        <tr>
            <th>{myOrderProduct.ID}</th>
            <td>
                <div className='d-flex'>
                    <div className="card">
                        <img src={myOrderProduct.url} className="card-img-top" alt="..." style={{ width: "6em", height: "6em" }}/>
                    </div>
                    <div className="card-body mx-2 w-50">
                        <h5 className="card-title">{myOrderProduct.productName}</h5>
                        <p className="card-text">{myOrderProduct.productDetail}</p>
                        <p className="card-text">{myOrderProduct.productPrice}</p>
                    </div>
                </div>
            </td>
            {/* <td>{myOrderProduct.OrderDate}</td> */}
            <td>{myOrderProduct.qty}</td>
            <td>{myOrderProduct.TotalProductPrice}</td>
        </tr>
    )
}
