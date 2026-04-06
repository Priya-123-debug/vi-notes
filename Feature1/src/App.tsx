
import { Routes, Route } from 'react-router-dom';
import Usersignup from './Componenet/Usersignup.tsx';
import Loginpage from './Componenet/Loginpage.tsx';
import Home from "./Componenet/Home.tsx";
import Editor from './Componenet/Editor.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Usersignup />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </div>
  );
}

export default App;