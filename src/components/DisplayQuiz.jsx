import React from 'react'
import "../CSS/displayquiz.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';

function DisplayQuiz() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout, quizArr, setQuizArr, room, setRoom, reportArr, setReportArr } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    let [index, setIndex] = useState(0);
    let [correctAns, setCorrectAns] = useState([]);

    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
            setRoom(() => localStorage.getItem("roomID"));
            setQuizArr(() => JSON.parse(localStorage.getItem("quizArr")))
        }
        if (quizArr.length > 0) {
            setLoading(false);
            getCorrect();
        }

        socket.on("student-submitted", (data) => {
            setReportArr(() => data.report);
            //console.log(data.report);
            navigate("/leaderboard");
        })
    }, [])

    function getCorrect() {
        let correct = 0;
        for (let i = 0; i < quizArr[index].option.length; i++) {
            let isCorrect = quizArr[index].option[i].correct;
            if (isCorrect) {
                correct = i + 1;
                break;
            }
        }
        let arr = correctAns.slice();
        arr.push(correct);
        setCorrectAns(() => arr.slice());
    }


    function nextQuestion() {
        if (index < quizArr.length - 1) {
            setIndex((prev) => prev + 1);
            getCorrect();
            socket.emit("change-quiz", { room })
        } else {
            socket.emit("end-game", { room, correctAns });
        }
    }

    return (
        <>{loading ? <h1>Loading...</h1> :
            <div className='display-cont'>
                <button className='next-bttn' onClick={() => nextQuestion()}>NEXT</button>
                <p className="q-no">Qusetion NO: {index + 1}</p>
                <p className="display-ques">{quizArr[index].question}</p>
                <div className="mid">
                    <div className="image">
                        <img src={quizArr[index].imageUrl.includes("undefined") ? `https://source.unsplash.com/random/?landscape` : quizArr[index].imageUrl} alt="" />
                    </div>
                    {/* <div className="stat">
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
                    </div> */}
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