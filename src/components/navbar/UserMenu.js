import React from 'react';

function UserMenu() {
  return (
    <div className="flex items-center">
      <button className="p-2 text-gray-600 hover:text-gray-800">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="ml-4 flex items-center">
        <img src="https://via.placeholder.com/36" alt="User Avatar" className="rounded-full" />
        <span className="ml-2 font-medium text-gray-700">Tom Cook</span>
      </div>
    </div>
  );
}

export default UserMenu;