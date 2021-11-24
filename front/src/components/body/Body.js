import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./auth/Login";
import Registro from "./auth/Register";
import ActivationEmail from './auth/ActivationEmail';
import NotFound from "../utils/NotFound/NotFound";
import {useSelector} from 'react-redux'
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import Home from "../Home/Home";

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth
    return (
        <section>
            <Routes>
                <Route path="/" element={<Home />} exact />                
                <Route path="/login" element={ isLogged ? <NotFound /> : <Login /> } exact />
                <Route path="/register" element={ isLogged ? <NotFound /> : <Registro />} exact />
                <Route path="/forgot_pwd" element={ isLogged ? <NotFound /> : <ForgotPassword />} exact />
                <Route path="/user/reset_pwd/:token" element={ isLogged ? <NotFound /> : <ResetPassword />} exact />
                <Route path="/profile" element={ !isLogged ? <NotFound /> : <Profile />} exact />

                <Route path="/user/activate/:activation_token" element={<ActivationEmail />} exact/>
            </Routes>   
        </section>        
    )
}

export default Body;