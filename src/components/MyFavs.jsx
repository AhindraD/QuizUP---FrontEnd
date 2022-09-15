import React, { useEffect, useState } from 'react';

import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import ProductCards from './ProductCards';

import axiosClient from '../ApiConfig';

export default function MyFavs() {
    let { ads, setAds, token, user,setUser } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user == null) {
            let userObj = JSON.parse(localStorage.getItem("user_data"));
            setUser(() => userObj);
        }
        fetchData();
        async function fetchData() {
            // let resp = await fetch("http://localhost:8000/ads/show", { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            let resp = await axiosClient.get("/ads/show");
            let respData = await resp.data;
            setAds(() => respData.filter((elem) => elem.seller._id === user._id));
            //console.log(ads);
            setLoading(false);
        }
    }, [])

    return (
        <>
            {loading ? <h1>loading...</h1> :
                ads.map((elem, indx) => {
                    return <ProductCards key={indx} product={elem} />
                })
            }
        </>
    )
}
