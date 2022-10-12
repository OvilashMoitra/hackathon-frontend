import React from 'react';
import './HomeStat.scss';
import AiModel from '../../assets/icons/Ai Hosted Challanges.png';
import DataScientists from '../../assets/icons/Data Scientists.png';
import AiChallange from "../../assets/icons/Ai Model Mission.png"
const HomeStat = () => {
    const stat = [
        {
            id: 1,
            num: '100k+',
            text: 'AI model submissions',
            image: AiModel
        },
        {
            id: 2,
            num: '50k+',
            text: 'Data Scientists',
            image: DataScientists
        },
        {
            id: 3,
            num: '100+',
            text: 'AI Challenges hosted',
            image: AiChallange
        },
    ]
    return (
        <div className='app__home-stat'>
            {
                stat.map(elem => <div className='d-flex align-items-center justify-content-center'>
                    <img src={elem?.image} alt="" className='text-white' />
                    <div className='d-flex flex-column align-items-start pl-5'>
                        <small className='text-white'>{elem?.num}</small>
                        <small className='text-white'>{elem?.text}</small>
                    </div>
                </div>)
            }
        </div>
    );
};

export default HomeStat;