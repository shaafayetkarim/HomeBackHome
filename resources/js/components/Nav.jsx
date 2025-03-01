import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/hope">Hope</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
