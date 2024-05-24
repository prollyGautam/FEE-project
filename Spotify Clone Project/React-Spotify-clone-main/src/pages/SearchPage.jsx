import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const SearchPage = () => {
    const [newReleases, setNewReleases] = useState([]);
    const [showList, setShowList] = useState([]);
    const [browseSingle, setBrowseSingle] = useState([]);
    const [artist, setArtist] = useState([]);
    const [{ token },dispatch] = useStateProvider();
    // console.log(token)
    // const token = 'BQC-EZC9ptTQtKoA1o0gIFFw8CLYgdpbvi_SORMpPWsQ2K5ppAeVAExfGGFOTHKII7x6_Y1WzIh_Z2AkxxHVZ01H8bcJ4yXL3cEWYQt21Vc66IipAMrVMnFDlyxDqRBwHMttNTE7bUZiQscWn2zkQK2bO8A9IEpv8HiVdwC4Nj3qEjyvlDb8HvPXzplD9ilhTKET0v3Hct7t9H-L4Wd5bcLq2UeZhiw-ZKvvCA';


    // coa preparation done with theory 

    // aiml theory done and mcq on the way 



    // enterprises software started / 
    useEffect(() => {


 const getArtist = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
                console.log('artist', data)
            setArtist(data);
        };



        const getPlaybackState = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/new-releases?offset=0&limit=6", {
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
            const { data } = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log('browseSingle', data)
            setBrowseSingle(data);
        };
        getbrowsesingle();
        getArtist();
        getPlaybackState();
        getshowlist();
    }, [token]);
    console.log(newReleases)
    return (
        <>
            <div className='flex flex-row  text-white  relative'>


                <div className='w-[20%] flex h-dvh sticky top-0 flex-col gap-3 '>

                    <Sidebar />
                </div>


                <div >



                    <div >
                        <Navbar />

                    </div>

                    <div className=' overflow-x-auto flex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">Categories</h1>
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



                    <div className=' overflow-x-autoflex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">Top Artists</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-start '>

                                {
                                artist?.artists?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <img src={item.images[0].url} alt={item.name} className="w-full rounded-full h-auto" />
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
                        <div className='w-auto overflow-x-auto flex flex-row justify-end'>


                            {
                                browseSingle?.playlists?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <img src={item.images[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                        <p className="text-md font-bold mt-2">{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className='w-fit overflow-x-auto flex flex-col justify-end'>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end'>


                            {newReleases?.albums?.items?.map((item) => (
                                <div key={item.id} className='w-[160px] m-7' >
                                    <img src={item.images[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                    <p className="text-md font-bold mt-2">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.artists[0].name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                         
            </div>
            
        </>
    );
}

export default SearchPage



