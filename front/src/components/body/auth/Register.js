import React, {useState} from "react";
import { Link} from "react-router-dom";
import "./auth.css";
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import {dispatchLogin} from '../../../redux/actions/authAction';
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation';

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
function Registro() {

    const [user, setUser] = useState(initialState)

    const {name, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err:'', success:''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password)){
            return setUser({...user, err: "Por favor complete todos los espacios", success:""})
        }

        else if(!isEmail(email)){
            return setUser({...user, err: "Correo inválido.", success:""})
        }
        else if(isLength(password)){
            return setUser({...user, err: "La contraseña debe tener al menos 6 caracteres.", success:""})
        }
        else if(!isMatch(password, cf_password)){
            return setUser({...user, err: "Las contraseñas no coinciden.", success:""})
        }
        
        try {
            const res = await axios.post('user/register', {
                name, email, password
            })
            setUser({...user, err:'', success: res.data.message})
        } catch (err) {
            err.response.data.message && 
            setUser({...user, err:err.response.data.message, success:''})
        }
    }

    return (
        <div className="login_page">
            <h2>Registro</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="name">Nombre</label>
                    <input 
                    type="text" 
                    placeholder="Ingrese su nombre" 
                    id="name" 
                    value={name} 
                    name="name"
                    onChange={handleChangeInput} />
                </div>
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
                <div>
                    <label htmlFor="cf_password">Confirmar Contraseña</label>
                    <input 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    id="cf_password" 
                    value={cf_password} 
                    name="cf_password"
                    onChange={handleChangeInput} 
                     />
                </div>

                <div className="row">
                    <button type="submit">Registrarse</button>
                </div>

            </form>

            <p>¿Ya tiene una cuenta? <Link to="/login">Inicie Sesión</Link></p>
        </div>
    )
}

export default Registro;