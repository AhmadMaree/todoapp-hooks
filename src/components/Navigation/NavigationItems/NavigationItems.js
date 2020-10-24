import React from 'react'; 
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as routeConst from '../../../Shared/Constants/constantRouter';
const navigationItems = (props) => {
   
    return (
       
            <ul className= {classes.NavigationItems}> 
             {props.isAuth && <NavigationItem Link={routeConst.ROOT_PATH} exact >Add To Do</NavigationItem>}
             {props.isAuth && <NavigationItem Link={routeConst.CHARTS_PATH} >Charts</NavigationItem>}
             {!props.isAuth ? <NavigationItem Link={routeConst.AUTHENTICAT_PATH} exact >Autenticate</NavigationItem>
                  : <NavigationItem Link={routeConst.LOGOUT_PATH} >Logout</NavigationItem>}
            </ul>
    );
}
export default navigationItems;