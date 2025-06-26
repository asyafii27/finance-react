import React from 'react';

function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2 w-1/3" />
      <div className="flex items-center">
        <div className="relative inline-block">
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="ml-4 flex items-center">
          <img src="https://via.placeholder.com/36" alt="User Avatar" className="rounded-full" />
          <span className="ml-2">Tom Cook</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;