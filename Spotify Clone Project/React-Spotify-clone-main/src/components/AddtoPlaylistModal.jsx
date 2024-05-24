import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const AddtoPlaylistModal = (props) => {
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false); 
    const [{ token, userInfo }] = useStateProvider();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setPlaylistName(e.target.value);
    };


    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to create the playlist here using Spotify API
        // Example code:
        fetch(`
        https://api.spotify.com/v1/users/${userInfo.userId}/playlists`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            body: JSON.stringify({
            name: playlistName,
            description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Playlist created:', data);
            // Close the modal or perform any other actions
        })
        .catch(error => {
            console.error('Error creating playlist:', error);
            // Handle the error or display an error message
        });
        // Add your logic to create the playlist here
        console.log('Creating playlist:', playlistName);
        // Close the modal or perform any other actions
    };

    const closeModal = () => {
        setIsOpen(false);
        navigate(`/mylibrary/${props.playlist}`);
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    const [allplaylist, setAllPlaylist] = useState([]);

      const getAllplaylist = async () => {
          const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", {
              headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
              },
          });
          console.log(data)
          setAllPlaylist(data);
      };
  
  
      const addSongToPlaylist = async (playlistId, trackUri) => {
          try {
              const response = await axios.post(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  {
                      uris: [trackUri],
                  },
                  {
                      headers: {
                          Authorization: "Bearer " + token,
                          "Content-Type": "application/json",
                      },
                  }
              );
              console.log("Song added to playlist:", response.data);
          } catch (error) {
              console.error("Error adding song to playlist:", error);
          }
      };


    return (
        <div className="modal z-[1000] w-[400px] h-auto " style={modalStyle}>
            <div className='flex flex-row text-black justify-between'>
                <h2>Select Playlist</h2>
                <button onClick={closeModal}>X</button>
            </div>
            
         
        </div>
    );
};

export default AddtoPlaylistModal;
