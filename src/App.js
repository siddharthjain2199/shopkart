import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { auth, fs } from './Config/Config'
import Home from './Components/Home';
import Navbar from './Components/Common/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Cart from './Components/Cart';
import AddProduct from './Components/Admin/AddProduct';
import NotFound from './Components/Common/PageNotFound';
import { Profile } from './Components/Profile';
import { MyOrders } from './Components/MyOrders';
import { AuthProvider } from './Context/Auth';
import AboutUs from './Components/AboutUs';

const App = () => {
  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection('users').doc(user.uid).get().then((snapshot) => {
            setUser(snapshot.data().UserName);
          })
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user;
  }
  const user = GetCurrentUser();

  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Navbar user={user} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/myorders" element={<MyOrders />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
