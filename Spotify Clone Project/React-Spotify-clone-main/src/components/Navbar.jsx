import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { reducerCases } from '../utils/Constants';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  const [searchQuery, setSearchQuery] = useState("");
  const [songdata, setSongData] = useState([]);
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [{ token, selectedPlaylist, selectedPlaylistId , playerState}, dispatch] =
    useStateProvider();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchSongs = async (query) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Process the data and handle the search results
      console.log(data);
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

 
  const playTrack = async (result
  ) => {
    setSongData(result);
    console.log(songdata);
    const id = result.id;
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        uris: [`spotify:track:${id}`],
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
        id: result.id,
        name: result.name,
        artists: result.artists.map((artist) => artist.name),
        image: result.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchSongs(searchQuery);
    }
  }, [searchQuery]);

  return (
    <>
    <Container navBackground={navBackground}>
      <div className="search__bar">
        <FaSearch  color="black"/>
        <input type="text" className="text-black" placeholder="Artists, songs, or podcasts" onChange={handleSearch} />
        
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
    {searchQuery && (
      <div className="w-[90%] overflow-auto rounded-lg bg-[#1e525e] mx-auto h-[500px] ">
        {
          searchResults.map((result) => (
            <div key={result.id} onClick={()=>playTrack(result)} className="flex hover:bg-neutral-900 hover:cursor-pointer items-center gap-3 p-3">
              <img src={result.album.images[0].url} alt={result.name} className="w-16 h-16 rounded-lg" />
              <div>
                <p className="text-white">{result.name}</p>
                <p className="text-gray-400">{result.artists[0].name}</p>
              </div>
            </div>
          ))
        }
      </div>
    )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    font-color: black;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
