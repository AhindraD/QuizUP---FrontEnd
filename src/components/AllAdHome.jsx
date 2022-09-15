import React, { useEffect, useState } from 'react'

import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import ProductCards from './ProductCards';

import axiosClient from '../ApiConfig';

export default function AllAdHome(props) {
    let { user, ads, setAds, token, setUser } = useContext(UserContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user == null) {
            setUser(() => JSON.parse(localStorage.getItem("user_data")));
        }
        fetchData();
        async function fetchData() {
            // let resp = await fetch("http://localhost:8000/ads/show", { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            let resp = await axiosClient.get("/ads/show")

            //let respData = await resp.json();
            setAds(() => resp.data);
            //console.log(resp);
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