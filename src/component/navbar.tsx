import React from 'react';
import '../style/navbar.css';
import Color from './color';
import Image from './image';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <span>AL</span><span style={Color.dangerColor()}>ONE</span>
            </div>
        </nav>
    );
};

export default Navbar;