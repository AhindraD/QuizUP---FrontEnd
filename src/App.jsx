import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import { UserContext } from './Contexts/UserContext';
import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import StartGame from './components/StartGame';

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
    <UserContext.Provider value={{ user, setUser, token, setToken, refreshToken, setRefreshToken, logout }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/subject/:id' element={<Quiz />} />
          <Route path='/start/:id' element={<StartGame />} />
        </Routes>
      </div >
    </UserContext.Provider>
  );
}

export default App;
