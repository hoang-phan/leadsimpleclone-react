import React, { useState, useEffect } from 'react';
import alarm from '../alarm.gif';

if (!AbortSignal.timeout) {
  AbortSignal.timeout = (ms) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(new DOMException("TimeoutError")), ms);
    return controller.signal;
  };
}

const healthcheckUrl = process.env.REACT_APP_HEALTHCHECK_URL;

// ping every 10 seconds until the backend server is up
function Ping({ wakeup }: {wakeup: () => void}) {
  useEffect(() => {
    const controller = new AbortController();
    const ping = () => {
      fetch(
        healthcheckUrl || "",
        { signal: AbortSignal.timeout(500) },
      ).then(wakeup).catch(() => {});
    }

    ping();
    const interval = setInterval(ping, 10000);

    return () => {
      controller.abort();
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-[#1b3e60] h-screen w-full">
      <h1 className="text-2xl text-white">Our FREE API server right now...</h1>
      <img src={alarm} className="max-w-[50%] max-h-[50%] my-5" />
      <h1 className="text-2xl text-white">Waking him up...</h1>
      <p className="text-white">Please be patient as it could take a couple minutes depending on the hosting service. If you don't want to wait, take a look at the source code</p>
      <p className="text-white">
        <a className="text-blue-500" href="https://github.com/hoang-phan/leadsimpleclone-api" target="_blank">Back-end</a>
        <span> and </span>
        <a className="text-blue-500" href="https://github.com/hoang-phan/leadsimpleclone-react" target="_blank">Front-end</a>
      </p>
    </div>
  );
}

export default Ping;
