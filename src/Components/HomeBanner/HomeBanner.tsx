import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../../assets/icons/Banner Image.png'
import './HomeBanner.scss'
const HomeBanner = () => {
    return (
        <div className='app__home-banner'>
            <div className='app__home-banner-test'>
                <div className='app__home-banner-heading'>
                    <span></span>
                    <div>
                        <h3>Accelerate Innovation </h3>
                        <h3>with Global AI Challenges</h3>
                    </div>
                </div>
                <p>AI Challenges at DPhi simulate real-world problems.</p>
                <p>It is a great place to put your AI/Data Science skills</p>
                <p> to test on diverse datasets allowing you to foster learning through competitions.</p>
                <Link to={'/createHackathon'} className="app__homeBanner-link text-center">Create Hackathon</Link>
            </div>
            <img src={BannerImage} alt="" />
        </div>
    );
};

export default HomeBanner;