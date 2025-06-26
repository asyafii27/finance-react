import React from 'react';
import SearchBar from './SearchBar';

function Navbar() {
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
              <a className="dropdown-item text-danger" href="#logout">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;