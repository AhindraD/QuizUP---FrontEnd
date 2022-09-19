import React from 'react'
import "../CSS/student.css"
import { useEffect, useState, useContext, useRef } from 'react'
import { UserContext, socket } from "../Contexts/UserContext";
import { useNavigate, Link, useParams } from 'react-router-dom';

function GameOn() {
    return (
        <div className='join-cont'>
            <div className="gameon-card">
            </div>
        </div>
    )
}

export default GameOn