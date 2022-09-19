import React from 'react'
import "../CSS/displayquiz.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

function DisplayQuiz() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout, quizArr, setQuizArr } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    let [index, setIndex] = useState(0);
    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
            setQuizArr(() => JSON.parse(localStorage.getItem("quizArr")))
        }
        if (quizArr.length > 0) {
            setLoading(false);
        }
    }, [quizArr])

    return (
        <>{loading ? <h1>Loading...</h1> :
            <div className='display-cont'>
                <p className="q-no">Qusetion NO: {index + 1}</p>
                <p className="display-ques">{quizArr[index].question}</p>
                <div className="mid">
                    <div className="image">
                        <img src={quizArr[index].imageUrl.includes("undefined") ? `https://source.unsplash.com/random/?landscape` : quizArr[index].imageUrl} alt="" />
                    </div>
                    <div className="stat">
                        <div className="row">
                            <img src="../images/letter-a.png" alt="" />
                        </div>
                        <div className="row">
                            <img src="../images/letter-b.png" alt="" />
                        </div>
                        <div className="row">
                            <img src="../images/letter-c.png" alt="" />
                        </div>
                        <div className="row">
                            <img src="../images/letter-d.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="display-opts">
                    <div className={`opt opt1`}>
                        <img src="../images/letter-a.png" alt="" />
                        {quizArr[index].option[0].answer}
                    </div>

                    <div className={`opt opt2`}>
                        <img src="../images/letter-b.png" alt="" />
                        {quizArr[index].option[1].answer}
                    </div>

                    <div className={`opt opt3`}>
                        <img src="../images/letter-c.png" alt="" />
                        {quizArr[index].option[2].answer}
                    </div>

                    <div className={`opt opt4`}>
                        <img src="../images/letter-d.png" alt="" />
                        {quizArr[index].option[3].answer}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default DisplayQuiz