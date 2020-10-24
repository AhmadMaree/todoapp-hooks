import React from 'react' ;
import {List, ListItem, SwipeableDrawer,ListItemText} from '@material-ui/core';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {

    
    
    return (
        <React.Fragment >
             <SwipeableDrawer
                        anchor={'left'}
                        open={props.show}
                        onOpen={props.closed}
                        onClose={props.closed}
                    >
                        <div className={classes.SideDrawer}>
                            <List>
                             <ListItem button >
                                 <ListItemText primary={<NavigationItems isAuth ={props.isAuthenticate}/>}/>
                             </ListItem> 
                            </List>
                        </div>
          </SwipeableDrawer>
        </React.Fragment>
    );

}

export default sideDrawer;