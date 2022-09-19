import React from 'react'
import "../CSS/student.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import { useNavigate, Link, useParams } from 'react-router-dom';

function JoinBatch() {
    const roomID = useParams().id;
    const navigate = useNavigate();
    let [student, setStudent] = useState('');
    function joinGame() {
        if (student.length > 0) {
            socket.emit("join-room", { roomID, name: student, joiner: socket.id });
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
                <button className="enter" onClick={() => joinGame()}>Enter</button>
            </div>
        </div>
    )
}

export default JoinBatch;