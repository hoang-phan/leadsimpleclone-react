import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import GitHubIcon from '@mui/icons-material/GitHub';
import logo from '../logo.svg';

function Navbar({logout, email}: {logout: () => void, email: string | null}) {
  return (
    <header className="App-header">
      <nav className="w-[250px] absolute top-0 left-0 bottom-0 bg-[#041736]">
        <NavLink to="/" className="w-full flex items-center justify-center p-4">
          <img src={logo} />
        </NavLink>
        <div
          className="w-full p-[16px] text-[#99A2AE] text-base font-medium flex text-left items-center"
        >
          <Avatar name={email || ""} size="25px" className="mr-2 rounded-full text-base"/>
          {email}
        </div>
        <NavLink to="/contacts" className="w-full p-[16px] text-[#99A2AE] text-base font-medium hover:bg-[#FFFFFF33] block text-left">
          <PersonIcon className="mr-[8px]" />
          Contacts
        </NavLink>
        <NavLink to="/leads" className="w-full p-[16px] text-[#99A2AE] text-base font-medium hover:bg-[#FFFFFF33] block text-left">
          <WorkIcon className="mr-[8px]" />
          Leads
        </NavLink>
        <div
          className="cursor-pointer w-full p-[16px] text-[#99A2AE] text-base font-medium block text-left"
          onClick={logout}
          data-testid="logout-button"
        >
          <LogoutIcon className="mr-[8px]" />
          Logout
        </div>
        <a
          className="cursor-pointer w-full p-[16px] text-[#99A2AE] text-base font-medium block text-left"
          href="https://github.com/hoang-phan/leadsimpleclone-api"
          target="_blank"
        >
          <GitHubIcon className="mr-[8px]" />
          Source - Backend
        </a>
        <a
          className="cursor-pointer w-full p-[16px] text-[#99A2AE] text-base font-medium block text-left"
          href="https://github.com/hoang-phan/leadsimpleclone-react"
          target="_blank"
        >
          <GitHubIcon className="mr-[8px]" />
          Source - Frontend
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
