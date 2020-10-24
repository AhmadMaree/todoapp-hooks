import React, { useContext , useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {authContext} from '../../../context/Providers/AuthProvider';
import {logOut} from '../../../context/actions/Auth/registerAuth';
import * as routePath from '../../../Shared/Constants/constantRouter';

const Logout = () => {


    const [,dispatch] = useContext(authContext)
    useEffect(()=>{
        logOut()(dispatch);
    },[dispatch])
        return <Redirect to={routePath.AUTHENTICAT_PATH} />
}
export default Logout;