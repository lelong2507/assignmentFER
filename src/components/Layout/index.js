import React from 'react';
import { Link } from 'react-router-dom';
import Information from '../Information/index.js';
import LogoShop from '../LogoShop/index.js';
import './style.css';

const Layout = ({ children }) => {
    return (
        <>
            <header className='header'>
                <div className='container'>
                    <div className='hamburger__menu'>
                        <LogoShop />
                        <div className='nav__links'>
                            <Link to="/">Home</Link>
                            <Link to="/our-product">Products</Link>
                            <Link to="/addProduct">Add Product</Link>
                        </div>
                        <Information />
                    </div>
                </div>
            </header>
            <main className='main__container'>
                {children}
            </main> 
        </>
    );
};

export default Layout;
