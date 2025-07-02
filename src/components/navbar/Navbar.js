import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login')
    }, 1000);
    
    toast.success('Logout berhasil!');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow rounded mb-4 px-4 py-3">
      <div className="container-fluid">
        <SearchBar />
        <div className="dropdown ms-auto">
          <button
            className="btn btn-light dropdown-toggle d-flex align-items-center"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <span>Username</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <li>
              <a className="dropdown-item" href="#profile">
                <i className="bi bi-person me-2"></i> Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout} >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </nav>

  );
}

export default Navbar;