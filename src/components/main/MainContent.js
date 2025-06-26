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
    <div className="flex min-h-screen bg-gray-100 initializeBody"style={{backgroundColor: '#0E2148'}}>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Sidebar />
        <div className="flex-grow-1">
          <Navbar />
          {/* Konten utama di sini */}
          <TableData columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default MainContent;