import React, {useState} from 'react';

import classes from './Layout.module.css'
import AppBar from '../../components/Navigation/AppBar/AppBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
const Layout = props => {

    const [showSideDrawer , setShowSideDrawer] = useState(false)

    const  sideDrawerToggleHandler=()=>{
        setShowSideDrawer(!showSideDrawer)
    }

    const showSideCloseDrawerHandler = () => {
        setShowSideDrawer(false)
    }
        return( 
        <React.Fragment>
            <AppBar toggleDrawer={sideDrawerToggleHandler} />
            <SideDrawer  show ={showSideDrawer} closed ={showSideCloseDrawerHandler}/>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </React.Fragment>
        )  
}
export default Layout;