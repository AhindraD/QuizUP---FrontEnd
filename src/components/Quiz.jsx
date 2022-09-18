import React from 'react'
import "../CSS/quiz.css"
import { useEffect, useState, useContext } from 'react'
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

    async function saveQuiz() {

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
                        { }
                        <div className="add-quiz">
                            <div className="plus">
                                <img src="./images/plus.png" alt="" />
                            </div>
                            <button className="delete">Delete</button>
                        </div>
                    </div>
                    <div className="quiz-right">

                    </div>
                </div>
            }
        </div >
    )
}

export default Quiz;