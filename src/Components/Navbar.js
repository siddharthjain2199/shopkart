import React, { useEffect, useState } from 'react'
import Icon from 'react-icons-kit'
import { Link, useNavigate } from 'react-router-dom'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth, fs } from '../Config/Config'
function Navbar({ user }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login')
        })
    }

    // state of total products
    const [totalProducts, setTotalProducts] = useState(0);

    //getting cart Products
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            } else {

            }
        })
    }, [])


    return (
        <div style={{ marginBottom: '110px' }}>
            <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">ShopKart</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {!user && <form className="form-inline my-2 my-lg-0 text-light">
                            <Link className="btn btn-primary mx-2" to="/signup">Signup</Link>
                            <Link className="btn btn-primary" to="/login">Login</Link>
                        </form>}
                        {user && <form className="form-inline my-2 my-lg-0 text-light">
                            <Link className="btn btn-primary" to="/profile">{user}</Link>

                            <Link className="btn btn-primary mx-2" to="/cart">
                                <Icon icon={shoppingCart} size={20}></Icon>
                                <span className='badge rounded-pill bg-danger'>{totalProducts}</span>
                            </Link>

                            <Link className="btn btn-primary" to="/login" onClick={handleLogout}>Logout</Link>
                        </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar