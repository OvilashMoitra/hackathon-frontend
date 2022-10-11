import React, { useState } from 'react';
import './HackathonCard.scss'
import Moment from 'moment';
import Countdown from "react-countdown";
import { TiInputChecked } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';
const HackathonCard = ({ elem }) => {
    const [id, setId] = useState();
    const today = new Date();
    // countdown process
    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        // if (completed) {
        //     // Render a complete state
        //     // return <Completionist />;
        //     render()
        // } else {
        // Render a countdown
        return (
            <span>
                <strong className='app__hackathon-timer'>
                    {days}    :    {hours} :    {minutes}
                </strong>
                <br />
                <small className='app__hackathon-timer-text'>
                    Days  Hours  Mins
                </small>
            </span>
        );
        // }
    };
    console.log("id of the clicked the card", id);
    return (
        <Link to={`HackathonInfo/${elem?._id}`} className="text-decoration-none">
            <div className='app__hackathon-card' onClick={() => setId(elem?._id)}>
                <img src={elem?.image} alt="" />
                <section>
                    {
                        elem?.status === "Past" ? <p className='app__hackathon-status-past'>{elem?.status}</p> : null
                    }
                    {
                        elem?.status === "Upcoming" ? <p className='app__hackathon-status-upcoming'>{elem?.status}</p> : null
                    }
                    {
                        elem?.status === "Active" ? <p className='app__hackathon-status-active'>{elem?.status}</p> : null
                    }
                </section>
                <p>{elem?.Name}</p>
                <section>
                    {
                        elem?.status === "Past" ? <>
                            <p>Ended On</p>
                            <p>
                                <strong>{Moment(elem?.endDate).format("LLL")}</strong>
                            </p>
                        </> : null
                    }
                    {

                        elem?.status === "Upcoming" ? <>
                            <p>Starts in</p>
                            <Countdown date={Date.now() + ((Moment(elem?.startDate).unix() - Moment(today).unix()) * 1000)} renderer={renderer} />
                            <br />
                            <button className='app__hackathon-participate-button'><TiInputChecked />Participate Now</button>
                        </> : null
                    }
                    {
                        elem?.status === "Active" ? <>
                            <p>Ends in</p>
                            <Countdown date={Date.now() + ((Moment(elem?.endDate).unix() - Moment(today).unix()) * 1000)} renderer={renderer} />
                            <br />
                            <button className='app__hackathon-participate-button'><TiInputChecked />Participate Now</button>

                        </> : null
                    }
                </section>
            </div>
        </Link>
    );
};

export default HackathonCard;