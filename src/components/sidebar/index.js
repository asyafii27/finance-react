import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Collapse otomatis saat resize jendela
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div
      className={`d-flex flex-column bg-primary bg-gradient min-vh-100 p-3 sidebar transition-all`}
      style={{
        width: collapsed ? '70px' : '260px',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Tombol Collapse */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-sm btn-light"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
        </button>
      </div>

      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-coin fs-2 text-white me-2"></i>
        {!collapsed && <span className="text-white fs-5 fw-bold">MyApp</span>}
      </div>

      {/* Menu Utama */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/dashboard') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
          >
            <i className="bi bi-house-door-fill"></i>
            {!collapsed && 'Dashboard'}
          </Link>
        </li>

        {/* Menu Keuangan */}
        <li className="nav-item mb-2 position-relative">
          <div className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link keuangan-toggle">
            <i className="bi bi-cash-stack"></i>
            {!collapsed && 'Keuangan'}
          </div>
          <ul className={`submenu nav flex-column mt-1 ${collapsed ? 'submenu-collapsed' : 'ms-4'}`}>
            <li className="nav-item">
              <Link
                to="/pengeluaran"
                className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/pengeluaran') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
              >
                <i className="bi bi-box2-fill"></i>
                {!collapsed && 'Pengeluaran'}
              </Link>
            </li>
            <li className="nav-item mb-1">
              <Link
                to="/income"
                className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/income') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
              >
                <i className="bi bi-bar-chart-line-fill"></i>
                {!collapsed && 'Pemasukan'}
              </Link>
            </li>
          </ul>
        </li>

        {/* Menu Master */}
        <li
          className="nav-item mb-2 position-relative"
          onMouseEnter={() => setHoveredMenu('master')}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="nav-link text-white rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link">
            <i className="bi bi-gear-fill"></i>
            {!collapsed && 'Master'}
          </div>

          {(hoveredMenu === 'master' || !collapsed) && (
            <ul
              className={`nav flex-column ${collapsed ? 'submenu-collapsed' : 'ms-4 mt-1'}`}
              style={{
                position: collapsed ? 'absolute' : 'static',
                left: collapsed ? '100%' : 'auto',
                top: 0,
                background: '#0d6efd',
                zIndex: 1000,
                borderRadius: 8,
              }}
            >
              <li className="nav-item">
                <Link
                  to="/company"
                  className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/company') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
                >
                  <i className="bi bi-building"></i>
                  {!collapsed && 'Perusahaan'}
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="/divisi"
                  className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/divisi') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
                >
                  <i className="bi bi-folder-fill"></i>
                  {!collapsed && 'Divisi'}
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Dokumen */}
        <li className="nav-item mb-2">
          <Link
            to="/documents"
            className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/documents') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
          >
            <i className="bi bi-file-earmark-text-fill"></i>
            {!collapsed && 'Dokumen'}
          </Link>
        </li>

        {/* Laporan */}
        <li className="nav-item mb-2">
          <Link
            to="/reports"
            className={`nav-link rounded py-2 px-3 d-flex align-items-center gap-2 sidebar-link ${isActive('/reports') ? 'bg-white text-primary fw-semibold' : 'text-white'}`}
          >
            <i className="bi bi-bar-chart-fill"></i>
            {!collapsed && 'Laporan'}
          </Link>
        </li>
      </ul>

      {/* Teams */}
      {!collapsed && (
        <>
          <div className="mt-4 mb-2 text-white-50 small">Your teams</div>
          <ul className="nav flex-column">
            {['Heroicons', 'Tailwind Labs', 'Workcation'].map((team, i) => (
              <li key={i} className="d-flex align-items-center gap-2 text-white mb-2 sidebar-link">
                <span className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28 }}>
                  {team[0]}
                </span>
                {team}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Sidebar;
