import * as React from 'react';
import "../CSS/login.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate, Link } from 'react-router-dom';


export default function LogIn() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken } = useContext(UserContext);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = async () => {
        let userInfo = {
            email,
            password,
        };
        //console.log(userInfo);
        let response = await fetch("https://quiz-jwgl.onrender.com/auth/login", {
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
        setUser(() => respData.existingUser);
        setToken(() => respData.accessToken);
        setRefreshToken(() => respData.refreshToken);
        localStorage.setItem("access_token", respData.accessToken);
        localStorage.setItem("refresh_token", respData.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(respData.existingUser));
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
                    <div className="email">
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(() => e.target.value)} />
                    </div>
                    <div className="password">
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(() => e.target.value)} />
                    </div>
                    <p className='toggle'>Don't have an account? <Link to={"/signup"}><b>Sign up then!</b></Link> </p>
                    <button className='login-bttn' onClick={(e) => handleSubmit()}>Log In</button>
                </div>
            </div>
            <div className="login-right">
                <img src="./images/quizUp-BG.jpg" alt="Photo by Vasily Koloda on Unsplash" />
            </div>
        </div>
    );
}