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
        setQuiz(() => resp.data[0].quiz);
        console.log(resp.data);
        if (resp.data[0].quiz.length > 0) {
            setEdit(() => resp.data[0].quiz[0]);
            setQues(() => resp.data[0].quiz[0].question);
            setOpt1(() => resp.data[0].quiz[0].option[0].answer);
            setOpt2(() => resp.data[0].quiz[0].option[1].answer);
            setOpt3(() => resp.data[0].quiz[0].option[2].answer);
            setOpt4(() => resp.data[0].quiz[0].option[3].answer);

            let currectArr = [];
            for (let i = 0; i < resp.data[0].quiz[0].option.length; i++) {
                if (resp.data[0].quiz[0].option[i].correct) {
                    currectArr.push(i + 1);
                }
            }
            setCorrect(() => currectArr);

        } else {
            newQuiz();
        }
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

    function changeEditSpace(quiz) {
        setEdit(() => quiz);
        setQues(() => quiz.question);
        setOpt1(() => quiz.option[0].answer);
        setOpt2(() => quiz.option[1].answer);
        setOpt3(() => quiz.option[2].answer);
        setOpt4(() => quiz.option[3].answer);

        let currectArr = [];
        for (let i = 0; i < quiz.option.length; i++) {
            if (quiz.option[i].correct) {
                currectArr.push(i + 1);
            }
        }
        setCorrect(() => currectArr);
    }

    async function newQuiz() {
        let quizData = {
            "question": "What is your question?",
            "option": [
                {
                    "answer": "Choice1",
                    "correct": false
                },
                {
                    "answer": "Choice2",
                    "correct": false
                },
                {
                    "answer": "Choice3",
                    "correct": false
                },
                {
                    "answer": "Choice4",
                    "correct": false
                }
            ],
            "subject": subjectID,
            "owner": user._id,
            "image": fileInputRef.current.files[0]
        }
        let response = await fetch(`https://kahoot.up.railway.app/quiz/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quizData),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        let respData = await response.json();
        if (respData.error != undefined) {
            window.alert(respData.error);
            return;
        }
        fetchData();
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
            "subject": subjectID,
            "owner": user._id,
            "image": fileInputRef.current.files[0]
        }
        for (let i = 0; i < correct.length; i++) {
            let indx = Number(correct[i]) - 1;
            quizData.option[indx].correct = true;
        }
        console.log(quizData);
        await fetch(`https://kahoot.up.railway.app/quiz/edit/${edit._id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quizData),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        setQues(() => "");
        setOpt1(() => "");
        setOpt2(() => "");
        setOpt3(() => "");
        setOpt4(() => "");
        setCorrect(() => []);
        fetchData();
    }

    async function deleteQuiz(quizID) {
        let response = await fetch(`https://kahoot.up.railway.app/quiz/delete/${quizID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        let respData = await response.json();
        if (respData.error != undefined) {
            window.alert(respData.error);
            return;
        }
        console.log(respData.done);
        fetchData();
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
                        {quiz.map((elem) => {
                            return (
                                <div className="quiz-ind" key={elem._id}>
                                    <button className="edit-bttn" onClick={() => changeEditSpace(elem)}>Edit</button>
                                    <button className="delete-bttn" onClick={() => deleteQuiz(elem._id)}>Delete</button>
                                </div>
                            )
                        })}
                        <div className="add-quiz">
                            <div className="plus">
                                <img src="https://github.com/AhindraD/QuizUP---FrontEnd/blob/master/public/images/plus.png?raw=true" alt="" />
                            </div>
                            <button className="add-quiz-bttn" onClick={() => newQuiz()}>Add Question</button>
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