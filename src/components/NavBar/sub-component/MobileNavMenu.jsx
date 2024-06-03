import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    getClosest,
    getSiblings,
    slideToggle,
    slideUp,
} from "../../../utils";
import { useUserState } from '../../UserContext';

const MobileNavMenu = () => {
    const { isAuthenticated } = useUserState();
    const homeUrl = process.env.PUBLIC_URL + "/" + (isAuthenticated ? "dashboard" : "");
    return (
        <nav className="site-mobile-menu">
            <ul>
                <li>
                    <NavLink to={homeUrl}><span className="menu-text">Home</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MobileNavMenu;
