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
                <li className="has-children">
                    <NavLink><span className="menu-text">AI</span></NavLink>
                    <span className="menu-toggle"><i className="far fa-angle-down"></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to="/ai/demo-appointment"><span className="menu-text">Appointment AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-car-part"><span className="menu-text">Car Parts AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-tire-store"><span className="menu-text">Tire Store AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-trial-offer"><span className="menu-text">Trial Offer AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-compliance"><span className="menu-text">Compliance AI</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/contact"><span className="menu-text">Contact</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
