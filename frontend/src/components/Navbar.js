// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // You'll need to create this

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1>Talk and Thrive</h1>
        
        <ul className="flex space-x-6 items-center">
          {!currentUser ? (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="hover:underline px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="hover:underline px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* <li>
                <Link 
                  to="/dashboard" 
                  className="hover:underline px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              </li> */}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;