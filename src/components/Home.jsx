import React from 'react'
import "../CSS/home.css"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../Contexts/UserContext";
import axiosClient from '../ApiConfig';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
    let { user, setUser, token, setToken, refreshToken, setRefreshToken, logout } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    let [subjects, setSubjects] = useState(true);
    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
        }
        fetchData();
        async function fetchData() {
            let resp = await axiosClient.get("/subject/all");
            setSubjects(() => resp.data);
            console.log(resp.data);
            setLoading(false);
        }
    }, [])


    return (
        <div className='home-cont'>
            <div className="home-top">
                <div className="home-logo" onClick={() => { navigate("/home") }}>
                    QuizUp
                </div>
                <button className='logout-bttn' onClick={() => logout()}>Logout</button>
            </div>

            {loading ? <h1 style={{ margin: "0 auto" }}>loading...</h1> :
                <div className="home-bottom">
                    <p className='temps'>Templates: </p>
                    {subjects.map((elem) => {
                        return (
                            <div className="subject-ind" key={elem._id}>
                                <div className="c1">
                                    <img src="./images/logo-icon2.png" alt="" />
                                </div>
                                <div className="c2">
                                    <div className="sub-title">{elem.name}</div>
                                    <div className="sub-owner">{elem.owner.name}</div>
                                </div>
                                <div className="c3">
                                    <button className="edit">Edit</button>
                                    <button className="start">Start</button>
                                    <p className="time">{elem.createdAt}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default Home