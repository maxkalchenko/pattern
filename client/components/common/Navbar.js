import React from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';

export default () => {
    return (
        <>
            <nav className='navbar navbar-expand-sm bg-dark navbar-dark justify-content-between'>
                <div className='container'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link'><i className='fa fa-home'></i></Link>
                        </li>
                        {['NEWS', 'TOUR', 'MUSIC', 'VIDEOS', 'PHOTOS', 'ABOUT', 'COMMUNITY', 'LYRICS', 'SHOP'].map(item =>
                            <li className='nav-item' key={item}>
                                <Link to={`/${item.toLowerCase()}`} className='nav-link'>{`${item}`}</Link>
                            </li>)}
                    </ul>
                    <UserNavbar/>
                </div>
            </nav>
        </>
    );
}
