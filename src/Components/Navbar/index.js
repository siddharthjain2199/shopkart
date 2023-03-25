import React, { useContext, useEffect, useReducer, useState } from 'react'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth, fs } from '../../Config/Config';
import { isEmpty } from 'lodash'
import { signOutWithEmailAndPassword } from '../../Libs/firebaseutils';

import { userReducer, initialState } from '../../data/reducers/userReducer';
import { AuthContext } from '../../Context/userContext';
import { useTranslation } from 'react-i18next';

function Navbar() {

    const [ dispatch] = useReducer(userReducer, initialState);
    const { t } = useTranslation();
    const handleLogout = async () => {
        await signOutWithEmailAndPassword(dispatch);
    };

    // state of total products
    const [totalProducts, setTotalProducts] = useState(0);

    //getting cart Products
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!(isEmpty(user))) {
                fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            } else {

            }
        })
    }, [])
    const { currentUser } = useContext(AuthContext);

    return (
        <div style={{ marginBottom: '110px' }}>
            <nav className="navbar navbar-expand-lg fixed-top bg-primary navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">ShopKart <img src='./logo.png' alt="logo" width={30} height={30}></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/about">About Us</Link>
                            </li>
                        </ul>
                        {!currentUser && // <form className="form-inline my-2 my-lg-0 text-light">
                            <ul className="navbar-nav mb-2 mb-lg-0 navbar-right">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                            // </form>
                        }
                        {currentUser && // <form className="form-inline my-2 my-lg-0 text-light">
                            <ul className="navbar-nav mb-2 mb-lg-0 navbar-right">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile"><em>{t('hello')}, {currentUser.UserName}</em></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        <Icon icon={shoppingCart} size={20}></Icon>
                                        <span className='badge rounded-pill bg-danger'>{totalProducts}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myorders">Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
                                </li>
                            </ul>
                            // </form>
                        }
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
