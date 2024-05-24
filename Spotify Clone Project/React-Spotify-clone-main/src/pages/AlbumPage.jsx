import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { AiFillClockCircle } from 'react-icons/ai'
import styled from "styled-components";
import Navbar from '../components/Navbar'
import { reducerCases } from '../utils/Constants'
import Footer from '../components/Footer'

const AlbumPage = ({ headerBackground }) => {
    const { id } = useParams()
    // const [{ token },dispatch] = useStateProvider();
    const [playlist, setPlaylist] = useState([]);

    const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();

    const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setPlaylist(response.data);
        const selectedPlaylist = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description.startsWith("<a")
              ? ""
              : response.data.description,
            image: response.data.images[0].url,
            tracks: response.data.tracks.items.map(({ track }) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images[2].url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            })),
          };
          dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });

    }


    useEffect(() => {
        getInitialPlaylist();
    }, [token, dispatch, id.id]);
    

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      };


      const playTrack = async (
        id,
        name,
        artists,
        image,
        context_uri,
        track_number
      ) => {
        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/play`,
          {
            context_uri,
            offset: {
              position: track_number - 1,
            },
            position_ms: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 204) {
          const currentPlaying = {
            id,
            name,
            artists,
            image,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        } else {
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        }
      };
      console.log(playlist)
  return (
   <>
    <div className='h-screen flex flex-row '>
        <div className='w-[20%]'>
        <Sidebar/>
        </div>


       
        <div className='grow flex overflow-auto flex-col gap-3'>

        <div>
            <Navbar/>
        </div>


        {id}

        {/* <div className='h-auto flex px-10 flex-row'>
            <div className='mr-10'>
                <img src={playlist && playlist.images[0].url} alt="" className='w-[240px] h-[240px]'/>
            </div>
            <div className='w-1/2 flex flex-col gap-5 items-start justify-center'>
                <h1 className='text-neutral-400 text-1xl'>  
                    PLAYLIST
                </h1>
                <h1 className='text-white text-[4rem]'>{playlist.name}</h1>
               
            </div>
        </div> */}
      

        {/* <table className="w-[90%] mx-auto ">
            <thead >
                <tr className="text-neutral-300 ">
                    <th className='text-left'>#</th>
                    <th className='text-left  '>TITLE</th>
                    <th className='text-left  '>ALBUM</th>
                    <th className='text-left  '></th>
                </tr>
            </thead>
            <tbody >
                {playlist &&
                    playlist.tracks &&
                    playlist.tracks.items.map(({ track }, index) => (
                        <tr key={track.id} className="text-white  ">
                            <td className='w-[100px] py-6'>{index + 1}</td>
                            <td>
                                <div className="flex items-center">
                                    <img src={track.album.images[2].url} alt="" className="w-10 h-10 mr-2" />
                                    <div>
                                        <h1>{track.name}</h1>
                                        <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{track.album.name}</td>
                            <td> 
                                {msToMinutesAndSeconds(track.duration_ms)}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table> */}



<Container headerBackground={headerBackground}>
      {playlist && (
        <>
          <div className="playlist cursor-pointer">
            <div className="image">
              {/* <img src={playlist } alt="selected playlist" /> */}
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{playlist.name}</h1>
              <p className="description">{playlist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">

                {
                    // playlist.tracks.map(({ track }, index) => (
                    //     <div key={track.id} className="row" onClick={() => playTrack(track.id, track.name, track.artists.map((artist) => artist.name), track.album.images[2].url, track.album.uri, track.track_number)}>
                    //         <div className="col">
                    //             <span>{index + 1}</span>
                    //         </div>
                    //         <div className="col detail">
                    //             <div className="image">
                    //                 <img src={track.album.images[2].url} alt="track" />
                    //             </div>
                    //             <div className="info">
                    //                 <span className="name">{track.name}</span>
                    //                 <span>{track.artists.map((artist) => artist.name).join(', ')}</span>
                    //             </div>
                    //         </div>
                    //         <div className="col">
                    //             <span>{track.album.name}</span>
                    //         </div>
                    //         <div className="col">
                    //             <span>{msToMinutesAndSeconds(track.duration_ms)}</span>
                    //         </div>
                    //     </div>
                    // )
                    // )
                }
              {/* {selectedPlaylist.tracks.imap(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )} */}


              {
                playlist.tracks.href
              }
            </div>
          </div>
        </>
      )}
    </Container>


        </div>


     
        
    </div>
    <div className='absolute bottom-0 w-full h-28'>
        <Footer/>
    </div>
   
    </>
  )
}

export default AlbumPage


const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
