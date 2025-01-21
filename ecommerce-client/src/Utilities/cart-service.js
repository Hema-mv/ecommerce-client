//const BASE_URL = 'https://ecommerce-api-egxx.onrender.com/api'; // Replace with your actual API base URL
const BASE_URL = 'http://localhost:5050/api'; // Replace with your actual API base URL

export async function fetchCart(userId) {
    const response = await fetch(`${BASE_URL}/cart/${userId}`);
    
    console.log('response:', response);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  }
  
  export async function addToCart(userId, cartItem) {
    try {
      // Fetch the existing cart
      const cart = await fetchCart(userId);
  
      // Check if the item already exists in the cart
      const existingItemIndex = cart.items.findIndex(item => item.productId === cartItem.productId);
      if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        cart.items[existingItemIndex].quantity += cartItem.quantity;
      } else {
        // Add the new item to the cart
        cart.items.push(cartItem);
      }
  
      //Update the cart in the backend
      const response = await fetch(`${BASE_URL}/cart/${cart._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(cart),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
      return await response.json();
    } catch (error) {
      if (error.message === 'Failed to fetch cart') 
        {
        // Create a new cart if it doesn't exist
        const newCart = {userId,
          items: [cartItem],
          status: 'pending',
        };
  
        const response = await fetch(`${BASE_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCart),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create cart');
        }
        return await response.json();
      } else {
        throw error;
      }
    }
  }
  
  export async function updateCart(cartId, cartData) {
    const response = await fetch(`${BASE_URL}/cart/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    return await response.json();
  }
  
  export async function removeCartItem(cartId, itemId) {
    const response = await fetch(`${BASE_URL}/cart/${cartId}/item/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    return await response.json();
  }