import React from 'react'
import "../CSS/startgame.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function StartGame() {
    const subjectID = useParams().id;
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout } = useContext(UserContext);

    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
        }
    }, [])

    return (
        <div className='start-cont'>
            <div className="start-card">
                <div className="start-top" onClick={() => { navigate("/home") }}>
                    <img src="../images/logo2.png" alt="" />
                </div>
                <div className="start-bottom">
                    <QRCodeSVG value="https://reactjs.org/" height="360" width="360" fgColor="black" includeMargin="true" />
                </div>
            </div>
        </div>
    )
}

export default StartGame