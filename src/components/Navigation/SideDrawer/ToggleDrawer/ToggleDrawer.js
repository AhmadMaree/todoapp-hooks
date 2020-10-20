import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import classes from './ToggleDrawer.module.css'

const toggleDrawer = (props) => {
    return(
        <div className={classes.DrawerToggle}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.clicked}
            edge="start"
            
          >
            <MenuIcon />
          </IconButton>     
        </div>
    )
}
export default toggleDrawer;