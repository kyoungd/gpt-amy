import React from 'react'
import {NavLink} from 'react-router-dom';
import { useUserState } from '../UserContext';

const NavBar = () => {
    const { isAuthenticated } = useUserState();
    const homeUrl = process.env.PUBLIC_URL + "/" + (isAuthenticated ? "dashboard" : "");
    return (
        <nav className="site-main-menu">
            <ul>
                <li>
                    <NavLink to={homeUrl}><span className="menu-text">Home</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
