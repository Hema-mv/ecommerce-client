import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from state
    setUser(null);

    // Clear user data from local storage
    localStorage.removeItem('user');


    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.background = '';
      rootElement.style.backgroundSize = '';
    }
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;