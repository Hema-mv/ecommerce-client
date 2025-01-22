import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/cart.css';
import { fetchCart, updateCart, removeCartItem } from '../utilities/cart-service';

const CartPage = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const options = Array.from({ length: 100 }, (_, i) => i + 1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();

    const rootElement = document.getElementById('root'); 
    if (rootElement) { 
      rootElement.style.background = "none";
      rootElement.style.backgroundSize = "cover";
    } 

  }, [user]);

  const fetchCartItemsusingLocalStorage = async () => {
    console.log('fetchCartItems', localStorage.getItem('cartItems'));
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    const groupedItems = items.reduce((acc, item) => {
      const existingItem = acc.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    setCartItems(groupedItems);
    console.log('fetchgroupedCartItems', groupedItems);
  };
  const fetchCartItems = async () => {
    try {
     
      const cart = await fetchCart(user.id);
      setCartItems(cart.items);
      setCartId(cart._id);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // const handleQuantityChange = async (index, newQuantity) =>{
  //   alert("handleQuantityChange",index)
  //   const newCartItems = [...cartItems];
  //   newCartItems[index].quantity = newQuantity;
  //   setCartItems(newCartItems);
  //   localStorage.setItem('cartItems', JSON.stringify(newCartItems));

  //   try {
  //     await updateCart(cartId, { items: newCartItems });
  //   } catch (error) {
  //     console.error('Error updating cart:', error);
  //   }

  // };
  const handleQuantityChange = (productId, quantity) => {
   
    const updatedCartItems = cartItems.map((item) =>
      item.productId._id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    updateCartItemQuantity(user.id, productId, quantity);
  };
  const handleRemoveItem = async(index) => {
    
    const itemId = cartItems[index]._id;
    
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    try {
      await removeCartItem(cartId, itemId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
  };
  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.productId.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.productId.name}</h2>
                <p>${item.productId.price}</p>
              
<div>
<select id="quantity" value={item.quantity} 
            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}> {options.map((option) => ( <option key={option} value={option}> {option} </option> ))} 
            </select> </div>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="cart-total">
        <h2>Total: ${calculateTotal()}</h2>
      </div>
      <button className="checkout-button" onClick={handleCheckout} >
        Checkout
      </button>
    </div>
    
  );
};

export default CartPage;
