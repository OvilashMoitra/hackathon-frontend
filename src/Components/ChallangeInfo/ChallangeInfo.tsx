import React from 'react';
import './ChallangeInfo.scss'
import NoteBook from '../../assets/icons/carbon_notebook-reference.png';
import Community from '../../assets/icons/Community.png';
import Robot from "../../assets/icons/Robot.png";
import Identication from "../../assets/icons/IdentificationCard.png"
const ChallangeInfo = () => {
    const challangeInfo = [
        {
            "id": 1,
            "heading": "Prove your skills",
            "description": "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
            "image": NoteBook
        },
        {
            "id": 2,
            "heading": "Learn from community",
            "description": "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
            "image": Community
        },
        {
            "id": 3,
            "heading": "Challenge yourself",
            "description": "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
            "image": Robot
        },
        {
            "id": 4,
            "heading": "Earn recognition",
            "description": "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
            "image": Identication
        }
    ]
    return (
        <div className='app__challange-info-container'>
            <h5>Why Participate in <span>AI Challenges?</span></h5>
            <div className='app__challange-info-card-container'>
                {challangeInfo.map(elem => <div className='app__challange-info-card'>
                    <img src={elem?.image} alt="" />
                    <div>
                        <h5>{elem?.heading}</h5>
                        <small>{elem?.description}</small>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default ChallangeInfo;