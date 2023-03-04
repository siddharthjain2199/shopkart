import React, { useEffect, useState } from 'react'
import { auth, fs } from '../Config/Config';
import { MyOrderTable } from './MyOrderTable';

export const MyOrders = () => {
    const [myOrderProducts, setMyOrderProducts] = useState([]);

    // getting orders from firestore collection and updating the state
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                fs.collection('Orders ' + user.uid).onSnapshot((snapshot) => {
                    const newOrderProducts = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }))
                    setMyOrderProducts(newOrderProducts);
                })
            } else {
                console.log('User is not signed in to retrieve cart')
            }
        })
    }, [])

    myOrderProducts.sort((a, b) => a.OrderDate.split('/').reverse().join().localeCompare(b.OrderDate.split('/').reverse().join()))

    return (
        <>
            {myOrderProducts.length > 0 &&
                <div>
                    <h3>MyOrders</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col-1">Order Id</th>
                                <th className="col-3">Product</th>
                                <th className="col-2">Quantity</th>
                                <th className="col">Date</th>
                                <th className="col-2">Payment Mode</th>
                                <th className="col-2">Total Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                        <MyOrderTable myOrderProducts={myOrderProducts} />
                        </tbody>
                    </table>
                </div>
            }

            {myOrderProducts.length < 1 &&
                <div className="container-fluid">No Orders to show</div>
            }
        </>
    )
}
