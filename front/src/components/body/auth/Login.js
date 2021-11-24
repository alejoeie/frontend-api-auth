import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import {dispatchLogin} from '../../../redux/actions/authAction';
import {useDispatch} from 'react-redux';

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}


function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useNavigate()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.message})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history("/")

        } catch (err) {
            err.response.data.message && 
            setUser({...user, err: err.response.data.message, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Dirección de Correo Electrónico</label>
                    <input 
                    type="text" 
                    placeholder="Ingrese su Correo Electronico" 
                    id="email" 
                    value={email} 
                    name="email"
                    onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                    type="password" 
                    placeholder="Ingrese su contraseña" 
                    id="password" 
                    value={password} 
                    name="password"
                    onChange={handleChangeInput} 
                     />
                </div>

                <div className="row">
                    <button type="submit">Iniciar Sesión</button>
                    <Link to="/forgot_pwd">¿Olvidó su contraseña?</Link>
                </div>

            </form>
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>

        </div>
    )
}

export default Login;