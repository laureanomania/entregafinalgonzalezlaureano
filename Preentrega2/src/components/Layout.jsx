import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer'; 
import '../styles/layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <NavBar />
            {children}
            <Footer /> 
        </div>
    );
};

export default Layout;