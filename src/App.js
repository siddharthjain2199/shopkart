import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { auth, fs } from './Config/Config'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Cart from './Components/Cart';
import AddProduct from './Components/AddProduct';
import NotFound from './Components/NotFound';

const App = () => {
    // getting current user function
    function GetCurrentUser(){
      const [user, setUser] = useState(null);
      useEffect(() => {
        auth.onAuthStateChanged((user)=>{
          if(user){
            fs.collection('users').doc(user.uid).get().then((snapshot)=>{
              setUser(snapshot.data().UserName);
            })
          }
          else{
            setUser(null);
          }
        })
      }, [])
      return user;
    }
    const user = GetCurrentUser();
    
  return (
    <Router>
     <Navbar user={user}/>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
  </Router>
  );
}

export default App;
