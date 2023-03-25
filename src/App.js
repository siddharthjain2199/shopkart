import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Cart from './Components/Cart';
import AddProduct from './Components/Admin/AddProduct';
import NotFound from './Components/Common/PageNotFound';
import { Profile } from './Components/Profile';
import { MyOrders } from './Components/MyOrders';
import AboutUs from './Components/AboutUs';
import { Products } from './Components/Products';
import { I18nextProvider } from 'react-i18next';
import i18n from './language/i18n';

const App = () => {

  return (
    <I18nextProvider i18n={i18n}>
      <div style={{marginTop:-50}}>
        <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/myorders" element={<MyOrders />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/add-product" element={<AddProduct />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </div>
    </I18nextProvider>
  );
}

export default App;
