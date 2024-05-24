import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';

const Modal = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(true); 
    const [{ token, userInfo }] = useStateProvider();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };




    const addSongToPlaylist = async (playlistId, trackUri) => {
        console.log('Adding song to playlist:', playlistId, trackUri);
        try {
          const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    
            {
              "uris": [
                `spotify:track:${trackUri}`
              ],
              "position": 0
            }
            ,
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
            addSongToPlaylist(data.id, '3txE0SZnwamBhYB2ZQtHwU');
        })
        .catch(error => {
            console.error('Error creating playlist:', error);
            // Handle the error or display an error message
        });


        console.log('Creating playlist:', playlistName);
        // Close the modal or perform any other actions
        closeModal();
        alert('Playlist created successfully');
    };

    const closeModal = () => {
        setIsOpen(false);
        navigate('/');
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

    return (
        <div className="modal w-[400px] h-auto z-[100]" style={modalStyle}>
            <div className='flex flex-row text-black font-semibold text-2xl justify-between'>
                <h2>Create Playlist</h2>
                <button onClick={closeModal}>X</button>
            </div>
            
            <form onSubmit={handleSubmit} className='flex text-xl font-semibold mt-3 flex-col gap-2'>
                <label htmlFor="playlistName" >Playlist Name:</label>
                <input
                    type="text"
                    id="playlistName"
                    className='border-2 p-2 bg-gray-100 border-gray-300 rounded-md '
                    value={playlistName}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    className='border-2 p-2 bg-gray-100 border-gray-300 rounded-md '
                    onChange={handleDescriptionChange}
                />
                <button className='p-2 bg-green-900 rounded-lg text-white ' type="submit">CREATE</button>
            </form>
        </div>
    );
};

export default Modal;
