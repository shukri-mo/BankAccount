import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="text-center p-6 bg-slate-600  ">
      <header>
        <nav>
          <ul className="list-none flex justify-between">
            <li className="inline mr-6">
              <Link to="login" className="text-xl text-white hover:text-slate-500 ">
                Create Account
              </Link>
            </li>
            <li className="inline">
              <Link to="account" className="text-xl text-white hover:text-slate-800-700 hover:underline">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
