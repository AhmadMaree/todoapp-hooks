import React, {useState,useContext} from 'react';

import classes from './Layout.module.css'
import AppBar from '../../components/Navigation/AppBar/AppBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {authContext} from '../../context/Providers/AuthProvider';
const Layout = props => {

    const [state] = useContext(authContext)
    const [showSideDrawer , setShowSideDrawer] = useState(false)

    const  sideDrawerToggleHandler=()=>{
        setShowSideDrawer(!showSideDrawer)
    }

    const showSideCloseDrawerHandler = () => {
        setShowSideDrawer(false)
    }
        return( 
        <React.Fragment>
            <AppBar toggleDrawer={sideDrawerToggleHandler} isAuthenticate={state.idToken !== null} />
            <SideDrawer  show ={showSideDrawer} closed ={showSideCloseDrawerHandler} isAuthenticate={state.idToken !== null}/>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </React.Fragment>
        )  
}
export default Layout;