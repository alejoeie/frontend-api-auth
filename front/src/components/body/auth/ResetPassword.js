import React, {useState} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification';
import {isLength, isMatch} from '../../utils/validation/Validation';


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function ResetPassword() {
    const [data, setData] = useState(initialState);
    const {token} = useParams();

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const handleResetPassword = async () => {
        if(isLength(password)){
            return setData({...data, err: "La contraseña debe tener al menos 6 caracteres.", success:""})

        } else if(!isMatch(password, cf_password)){
            return setData({...data, err: "Las contraseñas no coinciden.", success:""})

        } else {
            try{
                const res = await axios.post('/user/reset_pwd', {password}, {
                    headers: {Authorization: token}
                })

                return setData({...data, err: "", success: res.data.message})

            } catch (err){
                err.response.data.message && setData({...data, err: err.response.data.message, success: ''})
            }
        }
    }

    return (
        <div className="fg_pass">
        <h2>¿Olvido su constraseña?</h2>

        <div className="row">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" value={password}
            onChange={handleChangeInput}/>

            <label htmlFor="password">Confirmar constraseña</label>
            <input type="password" name="cf_password" id="cf_password" value={password}
            onChange={handleChangeInput}/>

            <button onClick={handleResetPassword}>Reestablecer Contraseña</button>
            
            </div>
    </div>
    )
}

export default ResetPassword