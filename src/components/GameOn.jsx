import React from 'react'
import "../CSS/student.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import { useNavigate, Link, useParams } from 'react-router-dom';
import GiNestedHexagons from '../CSS/logo';

function GameOn() {
    const navigate = useNavigate();
    let { studentProfile, setStudentProfile, room, setRoom } = useContext(UserContext);
    let [option, setOption] = useState(0);
    let [lock, setLock] = useState(false);
    let [ans, setAns] = useState([]);
    let [qNo, setQNo] = useState(1);
    function select(n) {
        if (!lock) {
            setOption(() => n);
            setLock((prev) => true);
        }
    }
    socket.on("quiz-changed", (data) => {
        let currArr = ans.slice();
        currArr.push(option);
        setAns(() => currArr);
        setLock((prev) => false);
        setOption(() => 0);
        setQNo((prev) => prev + 1);
    })

    socket.on("game-ended", (data) => {
        socket.emit("submit-all", { room, answers: ans, studentID: socket.id });
    });

    return (
        <div className='gameon-cont'>
            <div className="logo">
                <GiNestedHexagons />
                QuizUp
            </div>
            <p className="q-no">Question No: {qNo}</p>
            <div className="gameon-card">
                <p className='ch'>Choices</p>
                <div className="game-opts">
                    <div className="row1">
                        <div className={`g-opts ${option === 1 ? "mark" : ""}`} onClick={() => select(1)}>
                            <img src="../images/letter-a.png" alt="" />
                        </div>
                        <div className={`g-opts ${option === 2 ? "mark" : ""}`} onClick={() => select(2)}>
                            <img src="../images/letter-b.png" alt="" />
                        </div>
                    </div>
                    <div className="row1">
                        <div className={`g-opts ${option === 3 ? "mark" : ""}`} onClick={() => select(3)}>
                            <img src="../images/letter-c.png" alt="" />
                        </div>
                        <div className={`g-opts ${option === 4 ? "mark" : ""}`} onClick={() => select(4)}>
                            <img src="../images/letter-d.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOn