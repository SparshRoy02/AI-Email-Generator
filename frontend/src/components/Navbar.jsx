import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Mail className="logo-icon" size={28} />
        <span>MagicMail</span>
      </Link>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Generator
        </Link>
        <Link 
          to="/history" 
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <Clock size={18} />
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
