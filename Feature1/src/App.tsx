import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Usersignup from './Componenet/Usersignup.tsx';
import Loginpage from './Componenet/Loginpage.tsx';
import Home from "./Componenet/Home.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Usersignup />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;