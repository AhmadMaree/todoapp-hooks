import React from 'react'; 
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as routeConst from '../../../Shared/Constants/constantRouter';
const navigationItems = () => {
    return (
            <ul className= {classes.NavigationItems}> 
                <NavigationItem Link={routeConst.ROOT_PATH} exact >Add To Do</NavigationItem>
                <NavigationItem Link={routeConst.CHARTS_PATH} >Charts</NavigationItem>
            </ul>
    );
}
export default navigationItems;