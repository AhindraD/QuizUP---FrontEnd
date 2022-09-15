import * as React from 'react';
import "../CSS/login.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken } = useContext(UserContext);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        const data = new FormData(event.currentTarget);
        let user = {
            email,
            password,
        };
        let response = await fetch("https://kahoot.up.railway.app/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        let respData = await response.json();
        setUser(() => respData.existingUser);
        setToken(() => respData.accessToken);
        setRefreshToken(() => respData.refreshToken);
        localStorage.setItem("access_token", respData.accessToken);
        localStorage.setItem("refresh_token", respData.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(respData.existingUser));
    };

    return (
        <div className='login-cont'>
            <div className="login-left">
                <div className='login-card'>
                    <div className="logo">
                        <img src="./images/logo2.png" alt="" />
                    </div>
                    <p className='greet'>What's up, Leader!</p>
                </div>
            </div>
            <div className="login-right">
                <img src="./images/quizUp-BG.jpg" alt="Photo by Vasily Koloda on Unsplash" />
            </div>
        </div>
    );
}