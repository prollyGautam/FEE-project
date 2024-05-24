import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SearchPage from './pages/SearchPage'
import Mylibrary from './pages/Mylibrary'
import PlaylistPage from './pages/PlaylistPage'
import AlbumPage from './pages/AlbumPage'


const App = () => {
  return (
   <>
   <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path='/home' element={<SearchPage />} />
      <Route path='/mylibrary' element={<Mylibrary />} />
      <Route path='/mylibrary/:id' element={<PlaylistPage />} />
      <Route path='/mylibrary/albums/:id' element={<AlbumPage />} />
     
   </Routes>
   </>
  )
}

export default App