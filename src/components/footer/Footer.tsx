import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <p>© {new Date().getFullYear()} Wizard GM. All Rights Reserved.</p>
            <div className="footer-links">
                <a href="/terms">Terms & Conditions</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/contact">Contact Us</a>
            </div>
        </div>
    );
}

export default Footer;
