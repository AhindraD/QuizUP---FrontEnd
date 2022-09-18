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
    let [subjects, setSubjects] = useState(null);
    let [showCard, setShowCard] = useState(false);
    let [newSub, setNewSub] = useState("");

    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
            setToken(() => localStorage.getItem("access_token"));
            setRefreshToken(() => localStorage.getItem("refresh_token"));
        }
        fetchData();
    }, [])

    async function fetchData() {
        let resp = await axiosClient.get("/subject/all");
        setSubjects(() => resp.data);
        console.log(resp.data);
        setLoading(false);
    }

    async function addNewSub() {
        //console.log([newSub, user._id]);
        if (newSub !== "") {
            let dataObj = {
                name: newSub,
                owner: user._id
            };
            //console.log(dataObj);
            await fetch("https://kahoot.up.railway.app/subject/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });
        }
        setNewSub(() => "");
        toggleCard();
        fetchData();
    }

    function toggleCard() {
        setShowCard((prev) => !prev);
    }

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
                                    <button className="edit" onClick={() => navigate(`/subject/${elem._id}`)}>Edit</button>

                                    <button className="start" onClick={() => navigate(`/start/${elem._id}`)}>Start</button>
                                    <p className="time">
                                        Last edit:
                                        &nbsp; {new Date(elem.createdAt).toLocaleDateString()}
                                        &nbsp; {new Date(elem.createdAt).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="subject-add" onClick={() => toggleCard()}>
                        <div className="c">
                            <img src="./images/logo-icon2.png" alt="" />
                            <p>Create Template</p>
                        </div>
                    </div>

                    <div className={`overlay ${showCard ? "visible" : ""}`}>
                        <div className="add-card">
                            <div className="close">
                                <button className='close-bttn' onClick={() => toggleCard()}>close</button>
                            </div>
                            <div className="sub-create">
                                <div className="sub-name">
                                    <input type="text" placeholder='Template Name' value={newSub} onChange={(e) => { setNewSub(() => e.target.value) }} />
                                </div>
                                <button className="create" onClick={() => {
                                    addNewSub();
                                }}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Home