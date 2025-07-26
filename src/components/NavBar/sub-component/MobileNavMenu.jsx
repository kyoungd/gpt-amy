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
    const onClickHandler = (e) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;

        if (parentEl?.classList.contains("menu-toggle") || target.classList.contains("menu-toggle")) {
            const element = target.classList.contains("icon") ? parentEl : target;
            const parent = getClosest(element, "li");
            const childNodes = parent.childNodes;
            const parentSiblings = getSiblings(parent);

            // Close all sibling submenus
            parentSiblings.forEach((sibling) => {
                const sibChildNodes = sibling.childNodes;
                sibChildNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideUp(child, 1000);
                    }
                });
            });

            // Toggle the clicked submenu
            childNodes.forEach((child) => {
                if (child.nodeName === "UL") {
                    slideToggle(child, 1000);
                }
            });
        }
    };

    return (
        <nav className="site-mobile-menu">
            <ul>
                <li>
                    <NavLink to={homeUrl}><span className="menu-text">Home</span></NavLink>
                </li>
                <li className="has-children">
                    <NavLink><span className="menu-text">AI</span></NavLink>
                    <span className="menu-toggle" onClick={onClickHandler}><i className="far fa-angle-down"></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to="/ai/demo-appointment"><span className="menu-text">Appointment AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-car-part"><span className="menu-text">Car Parts AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-tire-store"><span className="menu-text">Tire Store AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-trial-offer"><span className="menu-text">Trial Offer AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-compliance"><span className="menu-text">Compliance AI</span></NavLink></li>
                        <li><NavLink to="/ai/demo-starrco"><span className="menu-text">Starcco AI</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/contact"><span className="menu-text">Contact</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MobileNavMenu;
