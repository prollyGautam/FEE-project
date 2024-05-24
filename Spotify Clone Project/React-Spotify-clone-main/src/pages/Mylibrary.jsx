import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Link, Navigate, Route, Router } from 'react-router-dom';
import { IoCreate } from 'react-icons/io5';

import Modal from '../components/Modal';

const Mylibrary = () => {
        const [playlists, setPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [showList, setShowList] = useState([]);
    const [browseSingle, setBrowseSingle] = useState([]);
    const [showModal, setShowModal] = useState(false);
   
    const [{ token },dispatch] = useStateProvider();
    // const token = 'BQC-EZC9ptTQtKoA1o0gIFFw8CLYgdpbvi_SORMpPWsQ2K5ppAeVAExfGGFOTHKII7x6_Y1WzIh_Z2AkxxHVZ01H8bcJ4yXL3cEWYQt21Vc66IipAMrVMnFDlyxDqRBwHMttNTE7bUZiQscWn2zkQK2bO8A9IEpv8HiVdwC4Nj3qEjyvlDb8HvPXzplD9ilhTKET0v3Hct7t9H-L4Wd5bcLq2UeZhiw-ZKvvCA';
    useEffect(() => {
        const getPlaybackState = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            setNewReleases(data);
        };

        const getshowlist = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/categories?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log(data)
            setShowList(data);
        };

        const getbrowsesingle = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/users/31utut3udfmv7qhfuhspn25uyu5m/playlists", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log('playlist', data)
            setPlaylists(data);
        };


        getbrowsesingle();
        getPlaybackState();
        getshowlist();
    }, [token]);

    // function handleplaylistclick() {
    //     console.log('playlist clicked')
    //     Router.push('/')
    // }
    // console.log(newReleases)
    




    return (
        <>
        {
                showModal ? <Modal setShowModal={setShowModal} />:<></>
                         }
            <div className='flex flex-row  text-white  relative'>


                <div className='w-[25%] flex h-dvh sticky top-0 flex-col gap-3 '>

                    <Sidebar />
                </div>


                <div >



                    <div >
                        <Navbar />

                    </div>

                    <div className=' overflow-x-autoflex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end '>


                            {
                                showList?.categories?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <img src={item.icons[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                        <p className="text-md font-bold mt-2">{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className='w-fit overflow-x-auto flex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">Playlists</h1>
                        </div>
                        <div className='w-auto items-center overflow-x-auto flex flex-row justify-end'>

                            {
                                playlists?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <Link to={`/mylibrary/${item.id}`}><img src={item?.images[0].url} alt={item?.name} className="w-full rounded-lg h-auto" /></Link>
                                        <p className="text-md font-bold mt-2">{item?.name}</p>
                                    </div>
                                ))
                            }
                            <div>
                            <div onClick={()=>setShowModal(true)} className='w-[160px] bg-[#324f] h-[160px] rounded-lg bg-white'>
                              <img src="https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg" className='rounded-lg' alt="dasd" />
                            </div>      
                            <div className='text-md font-bold mt-2'>
                                    Create Playlist
                            </div>
                            </div>
                            
                        </div>
                    </div>


                    <div className='w-fit overflow-x-auto flex flex-col justify-end'>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end'>

                            {
                                newReleases?.playlists?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                       <Link to={`/mylibrary/${item.id}`}><img src={item.images[0].url} alt={item.name} className="w-full rounded-lg h-auto" /></Link>
                                        <p className="text-md font-bold mt-2">{item.name}</p>
                                    </div>
                                ))
                            
                            }
                        </div>
                    </div>

                </div>

            </div>
                     
            
            
        </>
    );
}

export default Mylibrary



