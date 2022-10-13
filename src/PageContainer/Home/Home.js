import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HackathonCard from '../../Components/HackathonCard/HackathonCard.tsx';
import HomeBanner from '../../Components/HomeBanner/HomeBanner.tsx';
import HomeStat from '../../Components/HomeStat/HomeStat.tsx';
import Navigationbar from '../../Components/Navigationbar/Navigationbar.tsx';
import { BiSearchAlt } from "react-icons/bi";
import Moment from 'moment';
import './Home.scss'
import { matchSorter } from 'match-sorter'
import { Accordion } from 'react-bootstrap';
import ChallangeInfo from '../../Components/ChallangeInfo/ChallangeInfo.tsx';
const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkedArray, setCheckedArray] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);
    const today = new Date();
    useEffect(() => {
        fetch(`https://rocky-bastion-12910.herokuapp.com/getHackathonData`)
            .then(res => res.json())
            .then(data => {

                for (let i = 0; i < data?.length; i++) {
                    if (Moment(data[i]?.endDate).unix() < Moment(today).unix()) {
                        data[i] = { ...data[i], "status": "Past" };
                    } else if (Moment(today).unix() < Moment(data[i].startDate).unix()) {
                        data[i] = { ...data[i], "status": "Upcoming" };
                    } else if (Moment(today).unix() >= Moment(data[i]?.startDate).unix() && Moment(today).unix() <= Moment(data[i]?.endDate).unix()) {
                        data[i] = { ...data[i], "status": "Active" };
                    }
                }
                setHackathons(data);
            })
    }, [])

    const handleStatusCheck = (filtervalue) => {
        console.log(matchSorter(hackathons, filtervalue, { keys: ['status'] }));
        if (checkedArray?.includes(filtervalue) === true) {
            // setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
            if (filtervalue !== "ALL") {
                let newCheckArray = checkedArray.filter(elem => elem !== filtervalue);
                let tempFilter = [];
                const uniqueIds = [];
                let tempArr = [];
                if (newCheckArray?.includes('ALL') !== true) {
                    for (let index = 0; index < newCheckArray.length; index++) {
                        if ((newCheckArray[index] !== "Easy") && (newCheckArray[index] !== "Medium") && (newCheckArray[index] !== "Hard")) {
                            tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                        } else {
                            tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])]
                        }
                    }
                } else {
                    tempFilter = hackathons;
                }
                tempArr = tempFilter.filter(element => {
                    const isDuplicate = uniqueIds.includes(element._id);

                    if (!isDuplicate) {
                        uniqueIds.push(element._id);

                        return true;
                    }

                    return false;
                });;
                setCheckedArray(newCheckArray);
                setFilteredArray(tempArr);
            } else {
                // setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
                let newCheckArray = checkedArray.filter(elem => elem !== filtervalue);
                let tempFilter = [];
                const uniqueIds = [];
                let tempArr = [];
                for (let index = 0; index < newCheckArray.length; index++) {
                    if ((newCheckArray[index] !== "Easy") && (newCheckArray[index] !== "Medium") && (newCheckArray[index] !== "Hard")) {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                    } else {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])]
                    }
                    // if (newCheckArray[index] === "ALL") {
                    //     tempFilter = hackathons;
                    // }
                }
                tempArr = tempFilter.filter(element => {
                    const isDuplicate = uniqueIds.includes(element._id);

                    if (!isDuplicate) {
                        uniqueIds.push(element._id);

                        return true;
                    }

                    return false;
                });;
                setCheckedArray(newCheckArray);

                setFilteredArray(tempArr);

            }
        } else {
            setCheckedArray(prev => [...prev, filtervalue]);
            if (filtervalue !== "ALL") {
                let temArr = filteredArray;
                const uniqueIds = []
                temArr = [...temArr, ...matchSorter(hackathons, filtervalue, { keys: ['status'] })].filter(element => {
                    const isDuplicate = uniqueIds.includes(element._id);

                    if (!isDuplicate) {
                        uniqueIds.push(element._id);

                        return true;
                    }

                    return false;
                });;
                setFilteredArray(temArr);
                // setFilteredArray(prev => [...prev, ...matchSorter(hackathons, filtervalue, { keys: ['status'] })])
            } else {
                setFilteredArray(hackathons)
            }
        }

    }
    // level checking
    console.log(hackathons);
    const handleLevelCheck = (filtervalue) => {
        console.log(matchSorter(hackathons, filtervalue, { keys: ['level'] }));
        if (checkedArray?.includes(filtervalue) === true) {
            let newCheckArray = checkedArray.filter(elem => elem !== filtervalue);
            let tempFilter = [];
            console.log(newCheckArray);
            if (newCheckArray.includes("ALL") === true) {
                tempFilter = hackathons;
                setCheckedArray(newCheckArray);
                setFilteredArray(tempFilter);

            }

            else {
                const uniqueIds = [];
                let tempArr = [];
                for (let index = 0; index < newCheckArray.length; index++) {
                    if ((newCheckArray[index] !== "Easy") && (newCheckArray[index] !== "Medium") && (newCheckArray[index] !== "Hard")) {
                        console.log(newCheckArray[index])
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                    } else {
                        console.log(newCheckArray[index])
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])];
                        console.log("temp filter", tempFilter);
                    }
                    // if (newCheckArray[index] === "ALL") {
                    //     tempFilter = hackathons;
                }
                tempArr = tempFilter.filter(element => {
                    const isDuplicate = uniqueIds.includes(element._id);

                    if (!isDuplicate) {
                        uniqueIds.push(element._id);

                        return true;
                    }

                    return false;
                });;
                setCheckedArray(newCheckArray);
                setFilteredArray(tempArr);

            }
            // console.log("temporary filter", tempFilter);
            // setCheckedArray(newCheckArray);
            // setFilteredArray(tempFilter);

            // setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
            // setFilteredArray(filteredArray.filter(elem => elem?.level !== filtervalue));
            // hard and active when removing hard one is getting removed.
        } else {
            setCheckedArray(prev => [...prev, filtervalue]);
            let temArr = filteredArray;
            const uniqueIds = [];
            temArr = [...temArr, ...matchSorter(hackathons, filtervalue, { keys: ['level'] })].filter(element => {
                const isDuplicate = uniqueIds.includes(element._id);

                if (!isDuplicate) {
                    uniqueIds.push(element._id);

                    return true;
                }

                return false;
            });;
            setFilteredArray(temArr);
            // setFilteredArray(prev => [...prev, ...matchSorter(hackathons, filtervalue, { keys: ['level'] })])
        }
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/png" href="../src/assets/icons/main_logo_with_darktext_dphi 1.png" sizes="16x16" />
                <title>DPhi | Home</title>
            </Helmet>
            <Navigationbar />
            <HomeBanner />
            <HomeStat />
            <ChallangeInfo />
            <section className='app__searchbox-filter-container'>
                <p className='text-white fw-bolder' style={{ "fontFamily": "Poppins" }}>Explore Challenges</p>
                <div className='app__searchbox-filter'>
                    <BiSearchAlt className='app__hackathon-searchIcon' />
                    <input onChange={(e) => setSearchText(e?.target?.value)} type="search" name="search" id="search" placeholder='Search Here...' className='app__hackathon-searchBar' />
                    <Accordion className='app__filter-container'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Filter</Accordion.Header>
                            <Accordion.Body>
                                <p>Status</p>
                                <div className='d-flex justify-content-start flex-column align-items-start'>
                                    <p>
                                        <input onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="status1" name="status1" value="ALL" />
                                        <label htmlFor='status1'>ALL</label>
                                    </p>
                                    <p>

                                        <input onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="status2" name="status2" value="Upcoming" />
                                        <label htmlFor='status2'>Upcoming</label>
                                    </p>
                                    <p>
                                        <input onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="status3" name="status3" value="Active" />
                                        <label htmlFor='status3'>Active</label>
                                    </p>
                                    <p>
                                        <input onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="status4" name="status4" value="Past" />
                                        <label htmlFor='status4'>Past</label>
                                    </p>
                                </div>
                                <span className='app__filter-divider'></span>
                                <p>Level</p>
                                <div className='d-flex justify-content-start flex-column align-items-start'>
                                    <p>
                                        <input onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="level1" name="level1" value="Easy" />
                                        <label htmlFor='level1'>Easy</label>
                                    </p>
                                    <p>

                                        <input onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="level2" name="level2" value="Medium" />
                                        <label htmlFor='level2'>Medium</label>
                                    </p>
                                    <p>
                                        <input onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="level3" name="level3" value="Hard" />
                                        <label htmlFor='level3'>Hard</label>
                                    </p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='app__quik-checked-item-container'>
                    {checkedArray.map(elem =>
                        <p className='app__quik-checked-item'>{elem}</p>
                    )}
                </div>
            </section>
            <section className='app__hackathon-card-container'>
                {
                    filteredArray.length === 0 ? searchText === "" ? hackathons.map(elem => <HackathonCard key={elem?._id} elem={elem} />) : hackathons.filter(elem => elem?.Name.toLowerCase().includes(searchText.toLowerCase())).map(elem => <HackathonCard key={elem?._id} elem={elem} />) : filteredArray.map(elem => <HackathonCard key={elem?._id} elem={elem} />)
                }

            </section>

        </div>
    );
};

export default Home;