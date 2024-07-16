import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.accessToken)
  const [userEmail, setUserEmail] = useState<string | null>(sessionStorage.userEmail)

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userEmail');
    setAccessToken(null);
  }

  const setUserInfo = (token: string, email: string) => {
    setAccessToken(token);
    setUserEmail(email);
    sessionStorage.accessToken = token;
    sessionStorage.userEmail = email;
  }

  if (!accessToken) {
    return <Login setUserInfo={setUserInfo} logout={logout} />
  }

  return (
    <BrowserRouter>
      <div className="App h-screen overflow-hidden">
        <Navbar logout={logout} email={userEmail} />
        <section className="w-[calc(100%-250px)] absolute top-0 right-0 bottom-0 bg-white overflow-scroll">
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
