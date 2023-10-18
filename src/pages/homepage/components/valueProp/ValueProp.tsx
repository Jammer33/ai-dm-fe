import React from 'react';
import './ValueProp.css';

interface ValuePropProps {
    image: string;
    title: string;
    bodyText: string;
    isTextLeft: boolean;
}

const ValueProp: React.FC<ValuePropProps> = ({ image, title, bodyText, isTextLeft }) => {
    return (
        <div className={`value-prop ${isTextLeft ? 'text-left' : 'text-right'}`}>
            <div className={`value-prop-content ${isTextLeft ? 'text-left' : 'text-right'}`}>
                <div className="value-prop-text">
                    <h2>{title}</h2>
                    <p>{bodyText}</p>
                </div>
                <img src={image} alt={title} className="value-prop-image" />
            </div>
        </div>
    );
}

export default ValueProp;
