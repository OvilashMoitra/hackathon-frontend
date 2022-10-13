import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'moment'
import { BsBarChartLineFill } from "react-icons/bs";
import Navigationbar from '../../Components/Navigationbar/Navigationbar.tsx';
import './HackathonInfo.scss';
import { Link } from 'react-router-dom';
import PropagateLoader from "react-spinners/PropagateLoader";
const HackathonInfo = () => {
    const { id } = useParams();
    const [hackathon, setHackathon] = React.useState({});
    const today = new Date();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://rocky-bastion-12910.herokuapp.com/getHackathonData/${id}`)
            .then(res => res.json())
            .then(data => setHackathon(data));
    }, [id]);
    const handleDelete = (id: number): void => {
        const url = `https://rocky-bastion-12910.herokuapp.com/deleteHackathon/${id}`
        fetch(url, {
            method: 'DELETE',

        }).then(res => res.json())
            .then(data => navigate('/'))
    }
    console.log(hackathon);
    return (
        <>
            <Navigationbar />
            {
                hackathon?._id ? <>
                    <section className='app__hackathonInfo-banner'>
                        {
                            Moment(today).unix() < Moment(hackathon?.startDate).unix() ? <p className='app__hackathonInfo-upcoming-date'>Starts on {Moment(hackathon?.startDate).format('LLL')}</p> : null
                        }
                        {
                            Moment(today).unix() >= Moment(hackathon?.startDate).unix() && Moment(today).unix() <= Moment(hackathon?.endDate).unix() ? <p className='app__hackathon-status-active'>Live</p> : null
                        }
                        {
                            Moment(hackathon?.endDate).unix() < Moment(today).unix() ? <p className='app__hackathonInfo-past-date '>Ended on {Moment(hackathon?.endDate).format('LLL')}</p> : null
                        }
                        <h3 className='text-white'>{hackathon?.Name}</h3>
                        <p className='text-white'>Identify the class to which each butterfly belongs to</p>
                        <p className='app__hackathonInfo-level'><BsBarChartLineFill />{hackathon?.level}</p>
                    </section>
                    <div className='app__hackathonInfo-overview'>
                        <p>Overview</p>
                        <span></span>
                        <div className='app__hackathon-action-button-container'>
                            <button className='app__hackathon-edit-button'><Link to={`/EditHackathon/${hackathon?._id}`} className="text-decoration-none text-black">Edit</Link></button>
                            <button onClick={() => handleDelete(hackathon?._id)} className='app__hackathon-delete-button'>Delete</button>
                        </div>
                    </div>
                    <p className='app__hackathonInfo-description'>{hackathon?.description}</p>
                </> :
                    <PropagateLoader color="#36d7b7" className='app__hackathon-info-loader' />
            }

        </>
    );
};

export default HackathonInfo;