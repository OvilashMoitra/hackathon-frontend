import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HackathonCard from '../../Components/HackathonCard/HackathonCard.tsx';
import Navigationbar from '../../Components/Navigationbar/Navigationbar.tsx';
import './Home.scss'
const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/getHackathonData`)
            .then(res => res.json())
            .then(data => setHackathons(data))
    }, [])
    console.log(hackathons);
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DPhi |Home</title>
            </Helmet>
            <Navigationbar />
            <section className='app__hackathon-card-container'>
                {
                    hackathons.map(elem => <HackathonCard elem={elem} />)
                }
            </section>

        </div>
    );
};

export default Home;