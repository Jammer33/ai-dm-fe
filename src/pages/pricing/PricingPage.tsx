import React from 'react';

import PriceCard from './components/PriceCard';
import Hero from '../../components/hero/Hero';
import Navbar from '../../components/navbar/Navbar';

const PricingPage: React.FC = () => {
    return (
        <div className="pricing-page">
            <Navbar />
            <Hero 
                title="Choose Your Adventure"
                subtitle="Immerse yourself in endless narratives and unlimited possibilities. All at one simple price."
            />

            <div className="price-section">
                <PriceCard price={30} buttonText="Subscribe Now" />
            </div>

            {/* Optional footer component goes here */}
        </div>
    );
}

export default PricingPage;
