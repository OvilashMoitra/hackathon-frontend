import React from 'react';
import './HackathonCard.scss'
import Moment from 'moment';
import Countdown from "react-countdown";
import { TiInputChecked } from "react-icons/ti";
const HackathonCard = ({ elem }) => {
    const today = new Date();
    console.log(Moment(today).unix() < Moment(elem?.startDate).unix());
    // console.log(today.toISOString());
    // console.log(parseInt(today.toISOString) - elem?.startDate);
    // console.log('timing', Moment(today).unix());
    // console.log(Moment().subtract(Moment(elem?.startDate).format('LL'), 'd').format());
    // console.log('minus value', (Moment(today).unix() - Moment(elem?.startDate).unix()));
    // console.log(parseInt(Moment(elem?.startDate).format('LL')) - parseInt(Moment(today).format('LL')));


    // countdown process
    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
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
        }
    };
    return (
        <div className='app__hackathon-card'>
            <img src={elem?.image} alt="" />
            <section>
                {
                    Moment(elem?.endDate).unix() < Moment(today).unix() ? <p className='app__hackathon-status-past'>Past</p> : null
                }
                {
                    Moment(today).unix() < Moment(elem?.startDate).unix() ? <p className='app__hackathon-status-upcoming'>Upcomming</p> : null
                }
                {
                    Moment(today).unix() >= Moment(elem?.startDate).unix() && Moment(today).unix() <= Moment(elem?.endDate).unix() ? <p className='app__hackathon-status-active'>Live</p> : null
                }
            </section>
            <p>{elem?.Name}</p>
            <section>
                {
                    Moment(elem?.endDate).unix() < Moment(today).unix() ? <>
                        <p>Ended On</p>
                        <p>
                            <strong>{Moment(elem?.endDate).format("LLL")}</strong>
                        </p>
                    </> : null
                }
                {
                    //    const leftTime = (Moment(elem?.startDate).unix() - Moment(today).unix());
                    Moment(today).unix() < Moment(elem?.startDate).unix() ? <>
                        <p>Starts in</p>
                        <Countdown date={Date.now() + ((Moment(elem?.startDate).unix() - Moment(today).unix()) * 1000)} renderer={renderer} />
                        <br />
                        <button className='app__hackathon-participate-button'><TiInputChecked />Participate Now</button>
                    </> : null
                }
                {
                    Moment(today).unix() >= Moment(elem?.startDate).unix() && Moment(today).unix() <= Moment(elem?.endDate).unix() ? <>
                        <p>Ends in</p>
                        <Countdown date={Date.now() + ((Moment(elem?.endDate).unix() - Moment(today).unix()) * 1000)} renderer={renderer} />
                        <br />
                        <button className='app__hackathon-participate-button'><TiInputChecked />Participate Now</button>

                    </> : null
                }
            </section>
        </div>
    );
};

export default HackathonCard;