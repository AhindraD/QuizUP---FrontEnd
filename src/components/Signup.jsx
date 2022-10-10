import * as React from 'react';
import "../CSS/login.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, Link } from 'react-router-dom';


export default function SignUp() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken } = useContext(UserContext);
    let [email, setEmail] = useState('');
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        let userInfo = {
            name,
            email,
            password,
            confirmPassword,
        };
        let response = await fetch("https://kahoot.up.railway.app/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        })
            .catch(error => {
                alert(error);
                return;
            });
        let respData = await response.json();
        if (respData.error != undefined) {
            window.alert(respData.error);
            return;
        }
        //console.log(respData);
        setUser(() => respData.saveUser);
        setToken(() => respData.accessToken);
        setRefreshToken(() => respData.refreshToken);
        localStorage.setItem("access_token", respData.accessToken);
        localStorage.setItem("refresh_token", respData.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(respData.saveUser));
        navigate("/home");
    };

    return (
        <div className='login-cont'>
            <div className="login-left">
                <div className='login-card'>
                    <div className="logo">
                        <img src="./images/logo2.png" alt="" />
                    </div>
                    <p className='greet'>What's up, Leader!</p>
                    <div className="name">
                        <input type="text" placeholder='Name' onChange={(e) => setName(() => e.target.value)} />
                    </div>
                    <div className="email">
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(() => e.target.value)} />
                    </div>
                    <div className="password">
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(() => e.target.value)} />
                    </div>
                    <div className="password">
                        <input type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(() => e.target.value)} />
                    </div>
                    <p className='toggle'>Already have an account? <Link to={"/login"}><b>Log in then!</b></Link> </p>
                    <button className='login-bttn' onClick={(e) => handleSubmit()}>Sign Up</button>
                </div>
            </div>
            <div className="login-right">
                <img src="./images/quizUp-BG.jpg" alt="Photo by Vasily Koloda on Unsplash" />
            </div>
        </div>
    );
}