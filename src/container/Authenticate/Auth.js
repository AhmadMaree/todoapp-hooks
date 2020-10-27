import React, {useState,useContext, useEffect} from 'react';
import classes from './Auth.module.css';
import { Paper ,Button } from '@material-ui/core';
import * as Yup from "yup";
import {  useFormik } from 'formik';
import Form from './Form/Form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import {authContext} from '../../context/Providers/AuthProvider';
import onSetAuthRedirectPath from '../../context/actions/Auth/setRedirectPath';
import onAuth from '../../context/actions/Auth/registerAuth';
import * as routerPath from '../../Shared/Constants/constantRouter';

const Auth = () => {

    const [state,dispatch] =useContext(authContext)
    const [isSignup , setIsSingup] = useState(true);


    useEffect(()=> {
        if(state.redirectPath !== routerPath.ROOT_PATH) {
            onSetAuthRedirectPath(routerPath.ROOT_PATH)(dispatch)
        }
    },[state.redirectPath,dispatch])


    const onSwitchSingHandler = () => {
       setIsSingup(!isSignup);
    }
    const formik = useFormik({
        initialValues : {email :'' ,password :''},
        onSubmit : ({email , password}) =>{
            onAuth(email,password,isSignup)(dispatch)
        },
        validationSchema : Yup.object({
            email : Yup.string("Enter your Email")
                    .email("Enter Vaild Email")
                    .required("Email is Requird"),
            password: Yup.string("")
                    .min(8, "Password must contain at least 8 characters")
                    .required("Enter your password"),
        }),
    });


        let form = ( 
       <Paper elevation={1} className={classes.Paper} >
               <Form {...formik}/>
            <Button  onClick ={onSwitchSingHandler}>
                      Switch to {isSignup ? "SignIn" : 'SignUp'}
            </Button>
        </Paper>
       );

        if (state.loading) {
            form = <CircularProgress />
        }
        let errorMassage = null 
        if(state.error) {
        errorMassage = <p style={{color :'red'}}>{state.error.message}</p>
        }
        let RedirctSucssefulSign = null 
        if(state.idToken !== null) {
            RedirctSucssefulSign = <Redirect to={state.redirectPath}/>
        }
        return (
        <div className={classes.Auth}>
                        {RedirctSucssefulSign}
                        {errorMassage}
                        {form}
        </div>
        );
}
export default Auth;