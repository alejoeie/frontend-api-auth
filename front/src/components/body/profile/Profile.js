import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import { isLength, isMatch } from "../../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import './Profile.css';
const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)


    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState);
    const {name, password, cf_password, err, success} = data
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallBack] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success:''})
    }

    // const updateInfor = () => {
    //     try{

    //     } catch(err){
    //         setData({...data, err: err.response.data.message, success:''})
    //     }
    // }

    return (
        <div className="profile_page">
            <div className="col-left">
                <h2>{isAdmin ? "Admin Profile": "Perfil de usuario"}</h2>

                <div className="avatar">
                    <img src={avatar ? avatar: user.avatar} alt="" />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Cambiar</p>
                        <input type="file" name="file" id="file_up" />
                    </span>

                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Su nombre" value={name} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Su email" onChange={handleChange} ></input>
                </div>


                <div className="form-group">
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input type="password" name="password" id="password" 
                    placeholder="Su contrasena" value={password} onChange={handleChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirmar Contraseña</label>
                    <input type="password" name="cf_password" id="cf_password" 
                    placeholder="Su nueva contrasena" value={cf_password} onChange={handleChange}></input>
                </div>


                <button disabled={loading}>Actualizar</button>

            </div>

            <div className="col-right">
                <h2>{isAdmin ? "Modificar Cuestionarios" : "Cuestionarios"}</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="questions">
                        <thead>
                            <th>Pregunta</th>
                            
                           
                        </thead>

                        <tbody>
                            <td>Opcion1</td>
                            <td>Opcion2</td>
                            <td>Opcion3</td>
                            <td>Opcion4</td>

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Profile