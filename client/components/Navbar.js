import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/app.css';

export default () => {
    // console.log(styles);

    return (
        <>
            <nav className='navbar'>
                <Link to="/" className='nav-link'>Pattern</Link>
                <Link to="/signup" className='nav-link'>Sign up</Link>
            </nav>
        </>
    );
}
