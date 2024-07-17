import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from '../logo.svg';
import { useLogin } from '../services/apiQueries';

function Login(
  {
    setUserInfo,
    logout
  }:
  {
    setUserInfo: (token: string, email: string) => void,
    logout: () => void
  }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [loginFunc, { data, loading, error }] = useLogin();

  
  useEffect(() => {
    if (data?.login) {
      if (data.login.token) {
        setUserInfo(data.login.token, data.login.email);
        setErrorMessage("");
      } else {
        logout();
        setErrorMessage(data.login.error);
      }
    }
  }, [data, setUserInfo, logout]);

  const handleLogin = () => {
    loginFunc({ variables: { email, password } });
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#1b3e60] h-screen w-full">
      <div className="flex flex-col items-center justify-center h-full w-[300px]">
        <img src={logo} alt="Logo" />
        <h1 className="text-white text-xl font-bold pt-16">Log in</h1>
        {loading && <h2>Logging in...</h2>}
        {(errorMessage || error) && (
          <Box className="bg-red-500 text-white w-full p-5 my-3">
            {errorMessage || error?.message}
          </Box>
        )}
        <Box className="mt-3 px-2 pt-1 bg-white w-full">
          <TextField
            label="Email Address"
            variant="standard"
            className="w-full bg-white"
            value={email}
            onChange={({target}) => setEmail(target.value)}
            inputProps={{
              "data-testid": "email-input",
            }}
          />
        </Box>
        <Box className="my-3 px-2 pt-1 bg-white w-full">
          <TextField
            label="Password"
            variant="standard"
            className="w-full bg-white"
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
            inputProps={{
              "data-testid": "password-input",
            }}
          />
        </Box>
        <Button
          variant="contained"
          className="w-full font-bold"
          onClick={handleLogin}
          data-testid="login-button"
        >
          Login
        </Button>
        <p className="text-red-500 font-bold mt-5">
          WARNING: This project is for learning and showcasing purpose only.
          DO NOT USE IT TO INSPECT THE ORIGINAL WEBSITE.
          If you are an HR user please find login credentials in my CV.
        </p>
      </div>
    </div>
  );
}

export default Login;
