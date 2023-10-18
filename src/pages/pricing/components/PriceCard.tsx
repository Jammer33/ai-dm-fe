import React from 'react';
import './PriceCard.css';
import Button from '../../../components/button/Button';

interface PriceCardProps {
    price: number;
    buttonText: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ price, buttonText }) => {
    return (
        <div className="price-card">
            <h2>Unlimited Access</h2>
            <p className="price">${price} <span>/ month</span></p>
            <ul>
                <li>Unlimited Usage</li>
                <li>Full Access to All Features</li>
                <li>24/7 Customer Support</li>
            </ul>
            <Button type="Primary">{buttonText}</Button>
        </div>
    );
}

export default PriceCard;
