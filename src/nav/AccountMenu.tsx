import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext";


export default function AccountMenu() {
  const { setUser, setToken, user, token } = useAuth(); 

  const handleLogout = () => {
    setUser(null);     
    setToken(null); 
  };

  return(
    <>
      {user && token && 
        <div className="dropdown">
          <button 
            className="btn btn-inverse me-lg-5 dropdown-toggle" 
            type="button" 
            id="account-dropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            {user.email}
          </button>
          <ul className="dropdown-menu" aria-labelledby="account-dropdown">
            <li>
              <span className="dropdown-item" onClick={() => handleLogout()}>Logout</span>
            </li>
            <li>
              <Link to="/account-settings" className="dropdown-item">Account Settings</Link>
            </li>
          </ul>
        </div>
      }
    </>
  );
}