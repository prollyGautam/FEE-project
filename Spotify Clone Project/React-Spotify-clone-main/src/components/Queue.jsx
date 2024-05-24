import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import CurrentTrack from './CurrentTrack';

const Queue = () => {
    const [userQueue, setUserQueue] = useState([]);
    const [{ token, playerState,currentPlaying }, dispatch] = useStateProvider();


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




    const getQueue = async () => {
        const queuedata = await axios.get("https://api.spotify.com/v1/me/player/queue", {
            headers: {
                Authorization : "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        console.log("user queue",queuedata.data.queue);
        setUserQueue(queuedata.data.queue);
    };

    useEffect(() => {
        setInterval(() => {
            getQueue();
        }, 7000);
    }, []);

    return (
        <div className="queue absolute flex flex-col gap-3 bottom-32 left-5 rounded-lg  w-[270px] h-[200px] bg-[#102c33] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <h1 className="text-2xl font-semibold text-white p-3 pl-5">Queue</h1>

          {
            userQueue.length === 0 ? <>
        
            <div className="flex flex-row justify-between p-3 pl-5 pr-5 rounded-lg bg-[#1a4b53]">
                <div className="flex flex-col">
                    <h1 className="text-white font-semibold">Fetching tracks in queue...</h1>
                </div>
            </div>
            </>:
                userQueue.map((item) => (
                    <div  onClick={() =>
                        playTrack(
                          item.id,
                          item.name,
                          item.artists,
                          item.album.images[2].url,
                          item.album.uri,
                          item.track_number
                        )
                      } className="flex flex-row justify-between p-3 pl-5 pr-5 rounded-lg bg-[#1a4b53]">
                        <div className="flex flex-col">
                            <h1 className="text-white font-semibold">{item.name}</h1>
                            <p className="text-gray-300">{item.artist}</p>
                        </div>
                        <img src={item.album.images[0].url} alt={item.name} className="h-10 w-10 rounded-lg"/>
                    </div>
                ))
          }
        </div>
    );
}

export default Queue;