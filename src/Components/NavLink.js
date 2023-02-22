import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ path, name }) => {
    return (
        <div>
            <Link to={path} class="block py-2 pl-3 pr-4 text-lg text-accent bg-secondary rounded md:bg-transparent md:text-neutral md:p-0 dark:text-white" >{name}</Link>
        </div>
    );
};

export default NavLink;