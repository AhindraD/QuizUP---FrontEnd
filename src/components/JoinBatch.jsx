import React from 'react'
import "../CSS/student.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import { useNavigate, Link, useParams } from 'react-router-dom';

function JoinBatch() {
    let { studentProfile, setStudentProfile, room, setRoom } = useContext(UserContext);
    const roomID = useParams().id;
    const navigate = useNavigate();
    let [student, setStudent] = useState('');
    let [waiting, setWaiting] = useState(false);

    useEffect(() => {
        socket.on("room-joined", (data) => {
            setWaiting(() => true);
            setStudentProfile(() => data.newStudent)
        })
        socket.on("game-started", (data) => {
            navigate("/gameon");
        })
    }, [])
    
    function joinGame() {
        if (student.length > 0) {
            socket.emit("join-room", { roomID, name: student, joiner: socket.id });
            setRoom(() => roomID)
        }
    }
    return (
        <div className='join-cont'>
            <div className="join-card">
                <div className="join-logo">
                    <img src="../images/logo2.png" alt="" />
                </div>
                <p className="pin">Game PIN: <b>{roomID}</b></p>
                <div className="name">
                    <input type="text" placeholder='Enter your name' onChange={(e) => { setStudent(() => e.target.value) }} />
                </div>
                {waiting ? <h1>waiting for others...</h1> :
                    <button className="enter" onClick={() => joinGame()}>Enter</button>
                }
            </div>
        </div>
    )
}

export default JoinBatch;