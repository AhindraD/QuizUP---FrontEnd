import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';

import { useContext, useState, useEffect, useRef } from "react";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';

import axiosClient from '../ApiConfig';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AhindraD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function NewAd() {
    let navigate = useNavigate();
    let { user, setUser, token } = useContext(UserContext);
    let [cats, setCats] = useState([]);
    let fileInputRef = useRef(null);

    useEffect(() => {
        fetchData();
        async function fetchData() {
            // let resp = await fetch("http://localhost:8000/categories/show", { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
            let resp = await axiosClient.get("/categories/show");

            let respData = await resp.data;
            setCats(() => respData);
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();
        function getCatId(inpName) {
            for (let i = 0; i < cats.length; i++) {
                if (cats[i].name === inpName) {
                    return cats[i]["_id"];
                }
            }
            return inpName;
        }
        const data = new FormData(event.currentTarget);
        let newAd = {
            title: data.get('title'),
            price: data.get('price'),
            desc: data.get('desc'),
            seller: user._id,
            category: getCatId(data.get('category')),
        };

        data.append("seller", user._id);
        data.append("category", newAd.category);
        data.append("image", fileInputRef.current.files[0]);

        //https://marketplace-ebay.herokuapp.com/
        await fetch("http://localhost:8000/ads/new", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data,
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        navigate('/ads/myads');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New Ad
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Item Title"
                                    name="title"
                                    autoComplete="Item Title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="desc"
                                    label="Description"
                                    id="desc"
                                    autoComplete="Description"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    id="price"
                                    type="number"
                                    autoComplete="Price"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    options={cats}
                                    getOptionLabel={(option) => option.name.toString()}
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params}
                                        required
                                        fullWidth
                                        id="category"
                                        name="category"
                                        label="Categories" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' component="label">
                                    Upload Image

                                    <input
                                        accept="image/*"
                                        style={{ display: 'inline' }}
                                        id="image"
                                        ref={fileInputRef}
                                        type="file"
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtratitles" color="primary" />}
                                    label="I agree to all the terms & conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Post Ad
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={() => navigate("/ads")} variant="body2">
                                    Back To Homepage
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}