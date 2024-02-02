
'use client'
import React, { useState } from 'react';
const LoginRegisterBox = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="order-3 md:order-4 relative z-50 flex items-center" id="nav-content">
      <div className="relative">
        <button
          className="focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg
            className={`fill-current hover:text-black ${
              isDropdownOpen ? 'text-black' : 'text-gray-500'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <circle fill="none" cx="12" cy="7" r="3" />
            <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-50">
            <a
              href="/login"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
            >
              Login
            </a>
            <a
              href="/register"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </div>
  );
};


export default LoginRegisterBox;
