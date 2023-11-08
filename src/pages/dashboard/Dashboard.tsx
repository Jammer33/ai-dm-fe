
import React, { Fragment } from 'react';

import CampaignList from '../../components/campaignCard/CampaignList';
import DashboardMainArea from './components/DashboardMainArea';
import DashboardNavbar from '../../components/dashboardNavbar/DashboardNavbar';
import Container from '../../components/container/Container';

const Dashboard: React.FC = () => {
  return (
    <Fragment>
        <DashboardNavbar />
        <Container>
            <DashboardMainArea 
                username='Jammer33'
                onNewCampaignClick={() => console.log('New Campaign Clicked')}
            />
            
            <CampaignList
                campaigns={[
                    {
                        token: 'c_1234',
                        title: 'Crown of the Wraith King',
                        description: 'Delve into the heart of a haunted forest, unravel ancient curses and vye against spectral forces',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'campaign_cover.png',
                    },
                    {
                        token: 'c_5678',
                        title: 'Empire of Ashes',
                        description: 'Embark on a quest through the scorched remains of an empire, challenge the tyranny of the Ashen Emperor, and restore life to a land gripped by perpetual fire.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_1.png',
                    },
                    {
                        token: 'c_9101',
                        title: 'Abyssal Tides',
                        description: 'Navigate treacherous waters and pirate-infested islands, decipher the prophecy of the Deep Sea Leviathan, and prevent the awakening of an ancient aquatic horror.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_2.png',
                    },
                    {
                        token: 'c_1121',
                        title: 'Crystal Cataclysm',
                        description: 'In a realm where magic stems from crystalized energy, protect the shards from the Crystalline Colossus that seeks to shatter the world’s balance.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_3.png',
                    },
                    {
                        token: 'c_3141',
                        title: 'Eclipse of the Eternals',
                        description: 'Amidst a rare celestial event, race against time to stop the Eternal Night Cult from extinguishing the sun and plunging the world into darkness forever.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_4.png',
                    },
                    {
                        token: 'c_4151',
                        title: 'Reign of the Rune Lords',
                        description: 'Traverse ancient ruins and decipher forgotten runes to halt the ascension of tyrannical Rune Lords intent on enslaving the realm with their arcane supremacy.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_5.png',
                    },
                    {
                        token: 'c_5161',
                        title: 'The Sylvan Heist',
                        description: 'Outwit the elusive fae in the enchanted Sylvan Forest to recover a stolen artifact, but be wary of the tricks and traps that guard the path to your prize.',
                        nextSession: new Date(),
                        status: 'active',
                        imageUrl: 'cover_6.png',
                    }
                    
            ]}  
            />

        </Container>
    </Fragment>
  );
};

export default Dashboard;
