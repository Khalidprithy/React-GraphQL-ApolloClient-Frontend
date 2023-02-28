import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ path, name }) => {
    return (
        <div className="block py-2 pl-3 pr-4 text-lg text-white bg-secondary rounded md:bg-transparent md:text-neutral md:p-0 dark:text-white">
            <Link to={path} s>{name}</Link>
        </div>
    );
};

export default NavLink;