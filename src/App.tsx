import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(sessionStorage.accessToken)

  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <section className="w-[calc(100%-250px)] absolute top-0 right-0 bottom-0 bg-white">
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
