import React from 'react'
import "../CSS/quiz.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link, useParams } from 'react-router-dom';


function Quiz() {
    const subjectID = useParams().id;

    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    let [quiz, setQuiz] = useState(null);
    let [edit, setEdit] = useState(null);
    let fileInputRef = useRef(null);
    let [ques, setQues] = useState("");
    let [opt1, setOpt1] = useState("");
    let [opt2, setOpt2] = useState("");
    let [opt3, setOpt3] = useState("");
    let [opt4, setOpt4] = useState("");
    let [correct, setCorrect] = useState([]);

    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
        }
        fetchData();
        //console.log(subjectID);
    }, [])

    async function fetchData() {
        let resp = await axiosClient.get(`/subject/${subjectID}`);
        setQuiz(() => resp.data);
        console.log(resp.data);
        setLoading(false);
    }

    function addToCorrect(n) {
        let pos = correct.indexOf(n);
        if (pos === -1) {
            let arr = correct.slice();
            arr.push(n);
            setCorrect(() => arr);
        } else {
            let arr = correct.slice();
            arr.splice(pos, 1);
            setCorrect(() => arr)
        }
    }

    async function saveQuiz() {
        //("image", fileInputRef.current.files[0]
        let quizData = {
            "question": ques,
            "option": [
                {
                    "answer": opt1,
                    "correct": false
                },
                {
                    "answer": opt2,
                    "correct": false
                },
                {
                    "answer": opt3,
                    "correct": false
                },
                {
                    "answer": opt4,
                    "correct": false
                }
            ],
            "subject": "6322d6cf96a8a3bfdc45db3b",
            "owner": "6322d07c95b8f96cf73eee8d",
            "image": fileInputRef.current.files[0]
        }
        for (let i = 0; i < correct.length; i++) {
            let indx = Number(correct[i]) - 1;
            quizData.option[indx].correct = true;
        }
        console.log(quizData);
        setQues(() => "");
        setOpt1(() => "");
        setOpt2(() => "");
        setOpt3(() => "");
        setOpt4(() => "");
        setCorrect(() => []);
    }


    return (
        <div className='quiz-cont'>
            <div className="quiz-top">
                <div className="quiz-logo" onClick={() => { navigate("/home") }}>
                    QuizUp
                </div>
                <button className='save-bttn' onClick={() => saveQuiz()}>Save</button>
            </div>

            {loading ? <h1 style={{ margin: "0 auto" }}>loading...</h1> :
                <div className="quiz-bottom">
                    <div className="quiz-left">
                        <div className="add-quiz">
                            <div className="plus">
                                <img src="https://github.com/AhindraD/QuizUP---FrontEnd/blob/master/public/images/plus.png?raw=true" alt="" />
                            </div>
                            <button className="add-quiz-bttn">Add Question</button>
                        </div>
                    </div>

                    <div className="quiz-right">
                        <div className="question">
                            <input type="text" placeholder='What is your question?' value={ques} onChange={(e) => {
                                setQues(() => e.target.value)
                            }} />
                        </div>
                        <div className="ques-img">
                            <input
                                accept="image/*"
                                style={{ display: 'inline' }}
                                id="image"
                                ref={fileInputRef}
                                type="file"
                            />
                        </div>
                        <div className="ques-opts">
                            <div className={`opt opt1`}>
                                <input type="text" placeholder='Choice 1' value={opt1} onChange={(e) => {
                                    setOpt1(() => e.target.value)
                                }} />
                                <div className={`check`} onClick={() => addToCorrect(1)}>
                                    <div className={`circle ${correct.includes(1) ? "tick" : ""}`}></div>
                                </div>
                            </div>

                            <div className={`opt opt2`}>
                                <input type="text" placeholder='Choice 2' value={opt2} onChange={(e) => {
                                    setOpt2(() => e.target.value)
                                }} />
                                <div className={`check`} onClick={() => addToCorrect(2)}>
                                    <div className={`circle ${correct.includes(2) ? "tick" : ""}`}></div>
                                </div>
                            </div>

                            <div className={`opt opt3`}>
                                <input type="text" placeholder='Choice 3' value={opt3} onChange={(e) => {
                                    setOpt3(() => e.target.value)
                                }} />
                                <div className={`check`} onClick={() => addToCorrect(3)}>
                                    <div className={`circle ${correct.includes(3) ? "tick" : ""}`}></div>
                                </div>
                            </div>

                            <div className={`opt opt4`}>
                                <input type="text" placeholder='Choice 4' value={opt4} onChange={(e) => {
                                    setOpt4(() => e.target.value)
                                }} />
                                <div className={`check`} onClick={() => addToCorrect(4)}>
                                    <div className={`circle ${correct.includes(4) ? "tick" : ""}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Quiz;