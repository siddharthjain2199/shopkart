import React, { useState } from 'react'
import { auth, fs } from '../../Config/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { v4 as uuid } from 'uuid';
import styles from './Modal.module.css'

toast.configure();
export const Modal = ({ TotalPrice, totalQty, hideModal }) => {
    const afterSave = {}
    const afterCartSave = []

    // form states
    const [cell, setCell] = useState(null);
    const [residentialAddress, setResidentialAddress] = useState('');
    const [cartPrice] = useState(TotalPrice);
    const [cartQty] = useState(totalQty);

    // close modal
    const handleCloseModal = () => {
        hideModal();
    }

    const navigate = useNavigate();
    // cash on delivery
    const handleCashOnDelivery = async (e) => {
        e.preventDefault();
        // console.log(cell, residentialAddress, cartPrice, cartQty);
        const uid = auth.currentUser.uid;
        const userData = await fs.collection('users').doc(uid).get();
        const buyerInfo = {
            Customer_ID: uid,
            Name: userData.data().UserName,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        }
        const cartData = await fs.collection('Cart ' + uid).get();
        
        for (var snap of cartData.docs) {
            var data = snap.data();
            afterCartSave.push(data)
        }
        afterSave.AfterCartSave = afterCartSave;
        afterSave.PaymentMode = 'COD';
        afterSave.OrderDate = moment().format("DD-MM-YYYY hh:mm:ss")
        afterSave.BuyerInfo = buyerInfo;
        afterSave.OrderID = uuid().slice(0, 8);
        await fs.collection('Orders ' + uid).add(afterSave);
       
        for (var snap1 of cartData.docs) {
            await fs.collection('Cart ' + uid).doc(snap1.id).delete();
        }

        hideModal();
        navigate('/myorders');
        toast.success('Your order has been placed successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }

    return (
        <>
            <div className={styles.shade_area}>
                <div className={styles.modal_container}>
                    <form className='form-group' onSubmit={handleCashOnDelivery}>
                        <input type="number" className='form-control' placeholder='Cell No'
                            required onChange={(e) => setCell(e.target.value)} value={cell}
                        />
                        <br></br>
                        <input type="text" className='form-control' placeholder='Residential Address'
                            required onChange={(e) => setResidentialAddress(e.target.value)}
                            value={residentialAddress}
                        />
                        <br></br>
                        <label>Total Quantity</label>
                        <input type="text" className='form-control' readOnly
                            required value={cartQty}
                        />
                        <br></br>
                        <label>Total Price</label>
                        <input type="text" className='form-control' readOnly
                            required value={cartPrice}
                        />
                        <br></br>
                        <button type='submit' className='btn btn-success btn-md'>Submit</button>
                    </form>
                    <div className={styles.delete_icon} onClick={handleCloseModal}>x</div>
                </div>
            </div>
        </>
    )
}
