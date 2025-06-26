import React from 'react';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="d-flex flex-column bg bg-primary min-vh-100 bg-gradient p-4" style={{ width: '260px' }}>
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-coin fs-2 text-white"></i>
      </div>
      {/* Menu */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link active bg-opacity-25 bg-white text-white fw-semibold rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-house-door-fill"></i>
            Dashboard
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-cash-stack"></i>
            Keuangan
          </a>
          <ul className="nav flex-column ms-4 mt-1">
            <li className="nav-item">
              <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
                <i className="bi bi-box2-fill"></i>
                Pengeluaran
              </a>
            </li>
            <li className="nav-item mb-1">
              <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
                <i className="bi bi-bar-chart-line-fill"></i>
                Pemasukkan
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-cash-stack"></i>
            Master
          </a>
          <ul className="nav flex-column ms-4 mt-1">
            <li className="nav-item">
              <Link
                to="/company"
                className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link"
              >
                <i className="bi bi-building"></i>
                Perusahaan
              </Link>
            </li>
            <li className="nav-item mb-1">
              <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
                <i className="bi bi-folder-fill"></i>
                Divisi
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-file-earmark-text-fill"></i>
            Documents
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-bar-chart-fill"></i>
            Reports
          </a>
        </li>
      </ul>
      {/* Teams */}
      <div className="mt-4 mb-2 text-white-50 small">Your teams</div>
      <ul className="nav flex-column">
        <li className="d-flex align-items-center gap-2 text-white mb-2 sidebar-link">
          <span className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28 }}>H</span>
          Heroicons
        </li>
        <li className="d-flex align-items-center gap-2 text-white mb-2 sidebar-link">
          <span className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28 }}>T</span>
          Tailwind Labs
        </li>
        <li className="d-flex align-items-center gap-2 text-white sidebar-link">
          <span className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28 }}>W</span>
          Workcation
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;