import React, { useState, useEffect } from 'react';
import { fetchCart ,updateCartStatus} from '../utilities/cart-service'; // Import the fetchCart function
import '../Styles/Checkout.css'; // Import the CSS file for styling

const CheckoutPage = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  
  useEffect(() => {
    if (user && user.id) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const cartData = await fetchCart(user.id);
      setCartItems(cartData.items);
      calculateTotal(cartData.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update cart status to completed
      await updateCartStatus(user.id, 'completed');
      setOrderSubmitted(true);
      console.log('Order submitted:', formData);
      setFormData({
        name: '',
        address: '',
        email: '',
      });
      // Clear cart items
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
    
  };
  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    setTotal(totalPrice);
  };
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.productId}>
                  <img src={item.productId.image} alt={item.name} width="50" height="50" />
                  <div>
                    <p className='car'>{item.productId.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.productId.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;