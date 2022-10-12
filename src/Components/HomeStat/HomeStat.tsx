import React from 'react';
import './HomeStat.scss';
import AiModel from '../../assets/icons/Ai model Final Picture.png';
import DataScientists from '../../assets/icons/Data Science Final Picture.png';
import AiChallange from "../../assets/icons/Ai Challange Final Picture.png";
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
                    {elem?.id !== 1 ? <span className='app__home-stat-devider'></span> : null}
                    <div className='d-flex flex-column align-items-start'>
                        <div className='d-flex flex-column align-items-start'>
                            <small className='text-white'>{elem?.num}</small>
                            <small className='text-white'>{elem?.text}</small>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default HomeStat;