import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

import { CartWidget } from "./CartWidget";


const NavBar = () => {
    return (
        <nav>
            <ul className="list">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/category/smartphones">Smartphones</NavLink>
                </li>
                <li>
                    <NavLink to="/category/laptops">Laptops</NavLink>
                </li>
                <li>
                    <NavLink to="/category/tablets">Tablets</NavLink>
                </li>
                <CartWidget/>
                
                
            </ul>
        </nav>
    );
};

export default NavBar;
