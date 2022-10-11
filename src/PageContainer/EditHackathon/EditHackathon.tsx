import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../CreateHackathon/CreateHackathon.scss';
import { useEffect } from 'react';
const EditHackathon = () => {
    const { id } = useParams();
    const [hackathon, setHackathon] = React.useState({});
    useEffect(() => {
        fetch(`https://rocky-bastion-12910.herokuapp.com/getHackathonData/${id}`)
            .then(res => res.json())
            .then(data => setHackathon(data));
    }, [id])
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let hackathonInfo: any = { "Name": `${e?.target?.[1]?.value}`, "description": `${e?.target?.[7]?.value}`, "startDate": e?.target?.[3]?.value, "endDate": e?.target?.[5]?.value, "image": `${e?.target?.[9]?.value}` }
        // Level checking
        if (e?.target?.[10]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Easy" }
        } else if (e?.target?.[11]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Medium" }
        } else if (e?.target?.[12]?.checked === true) {
            hackathonInfo = { ...hackathonInfo, "level": "Hard" }
        }
        // Update a Hackathon Info to DB
        fetch(`https://rocky-bastion-12910.herokuapp.com/editHackathon/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(hackathonInfo)
        }).then(res => res.json())
            .then(result => console.log(result))
    }
    return (
        <div className='app__hacktathon-create'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DPhi| Edit Hackathon</title>
            </Helmet>
            <form onSubmit={handleEditSubmit}>
                <fieldset className='text-left'>Challange Name</fieldset>
                <input type="text" name="name" id="name" className='app__hackathon-create-input' required defaultValue={hackathon?.Name} /><br />
                <fieldset>Start Date</fieldset>
                <input type="datetime-local" name="startingDate" id="startingDate" className='app__hackathon-create-input' required defaultValue={hackathon?.startDate} />
                <fieldset>End Date</fieldset>
                <input type="datetime-local" name="endingDate" id="endingDate" className='app__hackathon-create-input' required defaultValue={hackathon?.endDate} />
                <fieldset> Description</fieldset>
                <textarea className='app__hackathon-create-input' name="description" id="description" cols={30} rows={10} required defaultValue={hackathon?.description} /><br />
                <fieldset>Image</fieldset>
                <input type="url" name="image" id="image" className='app__hackathon-create-input' required defaultValue={hackathon?.image} /><br />
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

export default EditHackathon;