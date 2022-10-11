import React from 'react';
import { Helmet } from 'react-helmet-async';
import HackathonInfo from '../HackathonInfo/HackathonInfo.tsx';
import './CreateHackathon.scss'
const CreateHackathon = () => {

    const handleSubmit = (e): void => {
        e.preventDefault();
        console.log(e?.target?.[10]?.checked);
        let hackathonInfo: any = { "Name": `${e?.target?.[1]?.value}`, "description": `${e?.target?.[7]?.value}`, "startDate": e?.target?.[3]?.value, "endDate": e?.target?.[5]?.value, "image": `${e?.target?.[9]?.value}` }
        // Level checking
        if (e?.target?.[10]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Easy" }
        } else if (e?.target?.[11]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Medium" }
        } else if (e?.target?.[12]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Hard" }
        }
        // // Active or Past or Upcoming
        // if (Moment(e?.target?.[5]?.value).unix() < Moment(today).unix()) {
        //     hackathonInfo = { ...hackathonInfo, "status": "Past" }
        // } else if (Moment(today).unix() < Moment(e?.target?.[3]?.value).unix()) {
        //     hackathonInfo = { ...hackathonInfo, "status": "Upcoming" }
        // } else if (Moment(today).unix() >= Moment(e?.target?.[3]?.value).unix() && Moment(today).unix() <= Moment(e?.target?.[5]?.value).unix()) {
        //     hackathonInfo = { ...hackathonInfo, "status": "Active" }
        // }
        console.log(e?.target?.[5]?.value < e?.target?.[3]?.value);

        // POST the hackathon in Database

        const url = `http://localhost:5000/hackathon`;
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(hackathonInfo)
        })
            .then(res => res.json())
            .then(result => console.log(result))
        console.log(hackathonInfo.startDate === hackathonInfo.endDate);

    }
    return (
        <div className='app__hacktathon-create'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DPhi |Create Hackathon</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <fieldset className='text-left'>Challange Name</fieldset>
                <input type="text" name="name" id="name" className='app__hackathon-create-input' required /><br />
                <fieldset>Start Date</fieldset>
                <input type="datetime-local" name="startingDate" id="startingDate" className='app__hackathon-create-input' required />
                <fieldset>End Date</fieldset>
                <input type="datetime-local" name="endingDate" id="endingDate" className='app__hackathon-create-input' required />
                <fieldset> Description</fieldset>
                <textarea className='app__hackathon-create-input' name="description" id="description" cols={30} rows={10} required /><br />
                <fieldset>Image</fieldset>
                <input type="url" name="image" id="image" className='app__hackathon-create-input' required /><br />
                <div className='app__hackathon-create-input-radio' >
                    <span>Choose the Challange Level</span>
                    <label >
                        <input type="radio" id="Easy" name="Level" value="Easy" required />
                        <span>Easy</span>
                    </label>
                    <br />
                    <label >
                        <input type="radio" id="Medium" name="Level" value="Medium" required />
                        <span>Medium</span>
                    </label>
                    <br />
                    <label >
                        <input type="radio" id="Hard" name="Level" value="Hard" required />
                        <span>Hard</span>
                    </label>
                    <br />
                </div>
                <input type="submit" value="Submit" className='app__sign-up-input' />
            </form>
        </div>
    );
};

export default CreateHackathon;