import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} PostifyAI. Todos os direitos reservados.</p>
                <a href="/sobre" className="text-gray-400 hover:text-white">Sobre</a>
                <span className="mx-2">|</span>
                <a href="/contato" className="text-gray-400 hover:text-white">Contato</a>
            </div>
        </footer>
    );
};

export default Footer;