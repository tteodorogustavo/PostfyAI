import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">PostifyAI</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/articles" className="hover:underline">Articles</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;