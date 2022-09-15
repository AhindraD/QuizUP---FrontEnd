import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { blue, cyan, pink, red } from "@mui/material/colors";

import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate, Route, Routes } from 'react-router-dom';
import AllAdHome from './AllAdHome';
import MyAd from './MyAd';
import MyFavs from './MyFavs';
import MySold from './MySold';
import NewAd from './NewAd';

export default function DisplayProducts(props) {
    let [loading, setLoading] = useState(true);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        },
    }));

    let { user, token, setUser } = useContext(UserContext);
    let goTo = useNavigate();
    useEffect(() => {
        if (user == null) {
            let userObj = JSON.parse(localStorage.getItem("user_data"));
            setUser(() => userObj);
        }
        setLoading(() => false);
    }, [])

    return (
        <>
            {
                loading ? <h1>Loading...</h1> :
                    <div className='display-cont'>
                        <div className="nav-bar" >
                            <p className="title">Ebay<b>Kart</b></p>
                            <button onClick={() => goTo("/ads")} className="home" >Home</button>
                            <button onClick={() => goTo("/ads/myads")} className="my-Ad" >My Ads</button>
                            <button onClick={() => goTo("/ads/myfavs")} className="my-interest" >Saved Ads</button>
                            <button onClick={() => goTo("/ads/mysold")} className="sold" >Sold</button>
                            <div className="user-name">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar sx={{ bgcolor: cyan[500] }} alt={user.name} src="/static/images/avatar/1.jpg" />
                                </StyledBadge>
                                &nbsp;
                                &nbsp;
                                {user.name}</div>
                        </div>

                        <div className='ad-cont'>
                            <Routes>
                                <Route path='/' element={<AllAdHome />} />
                                <Route path='/myads' element={<MyAd />} />
                                <Route path='/myfavs' element={<MyFavs />} />
                                <Route path='/mysold' element={<MySold />} />
                                <Route path='/addnew' element={<NewAd />} />
                            </Routes>
                        </div>
                    </div>
            }
        </>
    )
}
