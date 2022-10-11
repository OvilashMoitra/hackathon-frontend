import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HackathonCard from '../../Components/HackathonCard/HackathonCard.tsx';
import HomeBanner from '../../Components/HomeBanner/HomeBanner.tsx';
import HomeStat from '../../Components/HomeStat/HomeStat.tsx';
import Navigationbar from '../../Components/Navigationbar/Navigationbar.tsx';
import { BiSearchAlt } from "react-icons/bi";
import './Home.scss'
import { matchSorter } from 'match-sorter'
import Moment from 'moment';
import { Accordion } from 'react-bootstrap';
const Home = () => {
    const [hackathons, setHackathons] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkedArray, setCheckedArray] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);
    useEffect(() => {
        fetch(`https://rocky-bastion-12910.herokuapp.com/getHackathonData`)
            .then(res => res.json())
            .then(data => setHackathons(data))
    }, [])

    const handleStatusCheck = (filtervalue) => {
        console.log(matchSorter(hackathons, filtervalue, { keys: ['status'] }));
        if (checkedArray?.includes(filtervalue) === true) {
            // setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
            if (filtervalue !== "ALL") {
                let newCheckArray = checkedArray.filter(elem => elem !== filtervalue);
                let tempFilter = [];

                for (let index = 0; index < newCheckArray.length; index++) {
                    if ((newCheckArray[index] !== "Easy") || (newCheckArray[index] !== "Medium") || (newCheckArray[index] !== "Hard")) {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                    } else {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])]
                    }
                }
                setCheckedArray(newCheckArray);
                setFilteredArray(tempFilter);
            } else {
                // setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
                let newCheckArray = checkedArray.filter(elem => elem !== filtervalue);
                let tempFilter = [];
                setCheckedArray(newCheckArray);
                for (let index = 0; index < newCheckArray.length; index++) {
                    if ((newCheckArray[index] !== "Easy") || (newCheckArray[index] !== "Medium") || (newCheckArray[index] !== "Hard")) {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                    } else {
                        tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])]
                    }
                }
                setFilteredArray(tempFilter);

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
            setCheckedArray(checkedArray.filter(elem => elem !== filtervalue));
            for (let index = 0; index < newCheckArray.length; index++) {
                if ((newCheckArray[index] !== "Easy") || (newCheckArray[index] !== "Medium") || (newCheckArray[index] !== "Hard")) {
                    tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.status === newCheckArray[index])];
                } else {
                    tempFilter = [...tempFilter, ...filteredArray.filter(elem => elem?.level === newCheckArray[index])]
                }
            }
            setFilteredArray(tempFilter);

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
            <BiSearchAlt className='app__hackathon-searchIcon' />
            <input onChange={(e) => setSearchText(e?.target?.value)} type="search" name="search" id="search" placeholder='Search Here...' className='app__hackathon-searchBar' />
            <Accordion defaultActiveKey="0" className='app__filter-container'>
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
            <p>{filteredArray.length}</p>
            <section className='app__hackathon-card-container'>
                {
                    filteredArray.length === 0 ? searchText === "" ? hackathons.map(elem => <HackathonCard key={elem?._id} elem={elem} />) : hackathons.filter(elem => elem?.Name.toLowerCase().includes(searchText.toLowerCase())).map(elem => <HackathonCard key={elem?._id} elem={elem} />) : filteredArray.map(elem => <HackathonCard key={elem?._id} elem={elem} />)
                }

            </section>

        </div>
    );
};

export default Home;