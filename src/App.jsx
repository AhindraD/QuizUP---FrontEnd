import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import UserContext from './Contexts/UserContext';
import { useState } from 'react';
import DisplayProducts from './components/DisplayProducts';
import MyAd from './components/MyAd';
import MySold from './components/MySold';
import MyFavs from './components/MyFavs';
import NewAd from './components/NewAd';

function App() {
  let [user, setUser] = useState(null);
  let [ads, setAds] = useState(null);
  let [token, setToken] = useState(null);
  let [refreshToken, setRefreshToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, ads, setAds, token, setToken, refreshToken, setRefreshToken }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/ads/*' element={<DisplayProducts />} />
          {/* (/*) in above line : to make the /ads capable of going deeper i.e. make it a parent */}
        </Routes>
      </div >
    </UserContext.Provider>
  );
}

export default App;
