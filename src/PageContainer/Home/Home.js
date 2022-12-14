import React, { useEffect, useRef, useState } from 'react';
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
import { MdCancel } from "react-icons/md";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import Switch from "react-switch";
import PropagateLoader from "react-spinners/PropagateLoader";
const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkedArray, setCheckedArray] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);
    const [checked, setChecked] = useState(false);
    const manualALLClick = useRef();
    const manualActiveClick = useRef();
    const manualPastClick = useRef();
    const manualUpcomingClick = useRef();
    const manualEasyClick = useRef();
    const manualMediumClick = useRef();
    const manualHardClick = useRef();
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
    const makeOtherClick = (e) => {
        switch (e) {
            case "ALL":
                manualALLClick?.current.click();
                break;
            case "Active":
                manualActiveClick?.current.click();
                break;
            case "Past":
                manualPastClick?.current.click();
                break;
            case "Upcoming":
                manualUpcomingClick?.current.click();
                break;
            case "Easy":
                manualEasyClick?.current.click();
                break;
            case "Medium":
                manualMediumClick?.current.click();
                break;
            case "Hard":
                manualHardClick?.current.click();
                break;
            default:
                return;
        }
    }
    const handleToggle = (nextChecked) => {
        if (nextChecked !== true) {
            const sortedAsc = hackathons.sort(
                (objA, objB) => Number(new Date(objA.creationDate)) - Number(new Date(objB.creationDate)),
            );
            console.log(sortedAsc);
            setHackathons(sortedAsc);
        } else {
            const sortedAsc = hackathons.sort(
                (objA, objB) => Number(new Date(objB.creationDate)) - Number(new Date(objA.creationDate)),
            );
            console.log(sortedAsc);
            setHackathons(sortedAsc);
        }

        console.log(nextChecked);
        // console.log(sortedAsc);
        setChecked(nextChecked);
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
                <Switch
                    onChange={handleToggle}
                    checked={checked}
                    className="react-switch"
                    uncheckedIcon={<BsFillArrowUpCircleFill style={{ "marginLeft": "4px" }} className='text-white' title='Oldest First' />}
                    checkedIcon={<BsFillArrowDownCircleFill className='text-white' title='Newest First' />}
                />
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
                                        <input ref={manualALLClick} onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="ALL" name="ALL" value="ALL" />
                                        <label htmlFor='ALL'>ALL</label>
                                    </p>
                                    <p>

                                        <input ref={manualUpcomingClick} onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="Upcoming" name="Upcoming" value="Upcoming" />
                                        <label htmlFor='Upcoming'>Upcoming</label>
                                    </p>
                                    <p>
                                        <input ref={manualActiveClick} onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="Active" name="Active" value="Active" />
                                        <label htmlFor='Active'>Active</label>
                                    </p>
                                    <p>
                                        <input ref={manualPastClick} onClick={(e) => handleStatusCheck(e?.target?.value)} type="checkbox" id="Past" name="Past" value="Past" />
                                        <label htmlFor='Past'>Past</label>
                                    </p>
                                </div>
                                <span className='app__filter-divider'></span>
                                <p>Level</p>
                                <div className='d-flex justify-content-start flex-column align-items-start'>
                                    <p>
                                        <input ref={manualEasyClick} onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="Easy" name="Easy" value="Easy" />
                                        <label htmlFor='Easy'>Easy</label>
                                    </p>
                                    <p>

                                        <input ref={manualMediumClick} onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="Medium" name="Medium" value="Medium" />
                                        <label htmlFor='Medium'>Medium</label>
                                    </p>
                                    <p>
                                        <input ref={manualHardClick} onClick={(e) => handleLevelCheck(e?.target?.value)} type="checkbox" id="Hard" name="Hard" value="Hard" />
                                        <label htmlFor='Hard'>Hard</label>
                                    </p>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='app__quik-checked-item-container'>
                    {checkedArray.map(elem =>
                        <p className='app__quik-checked-item'>{elem} <MdCancel onClick={() => makeOtherClick(elem)} /></p>
                    )}
                </div>
            </section>
            {
                hackathons?.length > 0 ? <section className='app__hackathon-card-container'>
                    {
                        filteredArray.length === 0 ? searchText === "" ? hackathons.map(elem => <HackathonCard key={elem?._id} elem={elem} />) : hackathons.filter(elem => elem?.Name.toLowerCase().includes(searchText.toLowerCase())).map(elem => <HackathonCard key={elem?._id} elem={elem} />) : filteredArray.map(elem => <HackathonCard key={elem?._id} elem={elem} />)
                    }

                </section> : <PropagateLoader color='#00B87C' loading={true} size={15} />
            }

        </div>
    );
};

export default Home;