import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Home from '../components/Home';

const Root = () => {

    return (
        <>
            <Header/>
            { localStorage.getItem("isAuth") ? <Home/> : <LoginForm/>}
        </>
    );
};

export default Root