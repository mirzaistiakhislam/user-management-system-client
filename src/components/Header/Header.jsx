import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-base-200 py-3'>
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost normal-case text-2xl flex items-center">User Management System</Link>
            </div>
        </div>
    );
};

export default Header;