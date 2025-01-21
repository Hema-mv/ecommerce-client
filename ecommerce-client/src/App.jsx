import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ProductPage from './Pages/ProductPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import NavBar from './Components/NavBar';
import './Styles/app.css';

const App = () => {
  const [user, setUser] = useState({ id: null, name: '' ,email:''});
  return (
    <>
       {user.id ? (
          <>
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage user={user}/>} />
        <Route path="/product/:id" element={<ProductPage user={user}/>} />
        <Route path="/cart" element={<CartPage user={user}/>} />
        <Route path="/checkout" element={<CheckoutPage user={user}/>} />
        <Route path="/product" element={<ProductPage user={user}/>} />
        <Route path="/productlist" element={<ProductDetailsPage />} />
      </Routes>
    </div>
     </>
    ) 
    : (
      <AuthPage setUser={setUser} />
    )
    }
    </>
  );
};

export default App;
