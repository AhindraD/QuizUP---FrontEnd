import React from 'react'
import "../CSS/leaderboard.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';

function Leaderboard() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout, quizArr, setQuizArr } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
            setQuizArr(() => JSON.parse(localStorage.getItem("quizArr")))
        }
        setLoading(false);
    }, [])

    return (<>{loading ? <h1>Loading...</h1> :
        <div className='leaderboard-cont'>
            <p className="title">QuizUp</p>
            <div className="row">
                <p className="title">Congratulations!!!</p>
                <button onClick={() => navigate("/home")} className='home-bttn'  >HOME</button>
            </div>
        </div>}
    </>
    )
}

export default Leaderboard