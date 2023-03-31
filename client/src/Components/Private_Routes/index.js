import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const isauth=useSelector(state=>state.auth.isAuth)
  return isauth?children: <Navigate to="/signin"/>

}

export default PrivateRoute