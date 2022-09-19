import React from 'react'
import "../CSS/leaderboard.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import GiNestedHexagons from '../CSS/logo';
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';

function Leaderboard() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout, setQuizArr, reportArr, setReportArr } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
            setQuizArr(() => JSON.parse(localStorage.getItem("quizArr")))
        }
        console.log(reportArr);
        setLoading(false);
    }, [])

    return (<>{loading ? <h1>Loading...</h1> :
        <div className='leaderboard-cont'>
            <div className="title"><GiNestedHexagons />QuizUp</div>
            <div className="row">
                <p className="title">Congratulations!!!</p>
                <button onClick={() => navigate("/home")} className='home-bttn'  >HOME</button>
            </div>
            <div className="dash">
                <p className="dash-title">Dashboard</p>
            </div>
        </div>}
    </>
    )
}

export default Leaderboard