import React from 'react' ;
import {AppBar , Toolbar , Typography } from '@material-ui/core'

import classes from './AppBar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer'
const appBar = (props) => {

    return (
        <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
            <ToggleDrawer  clicked ={props.toggleDrawer}/>
            <Typography variant="h4">
                   TodoApp
            </Typography>
            <nav className ={classes.DesktopOnly}>
                    <NavigationItems  />
            </nav>
        </Toolbar>
       </AppBar>
    )

}

export default appBar;