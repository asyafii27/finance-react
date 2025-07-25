import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar';
import TableData from '../Table/index';

const columns = [
  { key: 'nama', label: 'Nama' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const data = [
  { id: 1, nama: 'Budi', email: 'budi@mail.com', role: 'Admin' },
  { id: 2, nama: 'Siti', email: 'siti@mail.com', role: 'User' },
];

function MainContent() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#0E2148' }}>
      {/* Sidebar kiri */}
      <div style={{ width: '240px', backgroundColor: '#2d89ff' }}>
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: '#f8f9fa' }}>
        <Navbar />

        {/* Konten halaman */}
        <div className="p-4">
          <TableData />
        </div>
      </div>
    </div>
  );
}

export default MainContent;