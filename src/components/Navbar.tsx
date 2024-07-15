import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../logo.svg';

function Navbar() {
  return (
    <header className="App-header">
      <nav className="w-[250px] absolute top-0 left-0 bottom-0 bg-[#041736]">
        <NavLink to="/" className="w-full flex items-center justify-center p-4">
          <img src={logo} />
        </NavLink>
        <NavLink to="/contacts" className="w-full p-[16px] text-[#99A2AE] text-base font-medium">
          <PersonIcon className="mr-[8px]" />
          Contacts
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
