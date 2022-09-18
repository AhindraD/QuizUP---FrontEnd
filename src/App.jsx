import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import { UserContext } from './Contexts/UserContext';
import { useState } from 'react';
import Home from './components/Home';

function App() {
  const goTo = useNavigate();
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(null);
  let [refreshToken, setRefreshToken] = useState(null);

  function logout() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("user_data", "");
    goTo("/");
  }

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, refreshToken, setRefreshToken,logout }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/home' element={<Home />} />
          {/* (/*) in above line : to make the /ads capable of going deeper i.e. make it a parent */}
        </Routes>
      </div >
    </UserContext.Provider>
  );
}

export default App;
