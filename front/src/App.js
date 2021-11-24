import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/actions/authAction";
import axios from "axios";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import './index.css';
function Routing(){
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

    return(
     
     <BrowserRouter>
     
      <div className="App">
        <Header />
        <Body /> 
      </div>
      </BrowserRouter>
      
    )
}

export default Routing;