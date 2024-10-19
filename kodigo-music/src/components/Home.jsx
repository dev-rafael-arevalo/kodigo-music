import React, { useEffect, useState, useRef } from 'react';
import { getTracks } from '../services/jamendoService';
import ControlButton from './ControlButton';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchTracks() {
      const tracksData = await getTracks();
      setTracks(tracksData);
      if (tracksData.length > 0) {
        setCurrentTrack(tracksData[0]);
      }
    }
    fetchTracks();
  }, []);

  const handlePlay = () => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
      setIsPlaying(true);  // Iniciar automáticamente la siguiente canción
    }
  };

  const handlePrevious = () => {
    if (tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
      setIsPlaying(true);  // Iniciar automáticamente la canción anterior
    }
  };

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true); // Comenzar a reproducir la canción seleccionada
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audio;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  return (
    <div>
      <h2>Kodigo Music</h2>
      <div className="player-container">
      <div className="track-list-container">
        <h2>Lista de canciones</h2>
        <ul className="track-list">
          {tracks.map((track, index) => (
            <li 
              key={track.id} 
              className={track.id === currentTrack?.id ? 'active-track' : ''}
              onClick={() => handleTrackClick(track)}
            >
              <span>{index + 1}. {track.name}</span>
              <span>{track.artist_name}</span>
              <span>{track.album_name}</span>
            </li>
          ))}
        </ul>
      </div>
        <div className="track-details">
          {currentTrack && (
            <>
              <h3>{currentTrack.name}</h3>
              <img src={currentTrack.album_image} alt={currentTrack.name} className="current-track-image" />
              <audio ref={audioRef} />
              <div className="controls">                
                <ControlButton type="back" onClick={handlePrevious} />                
                <ControlButton 
                  type={isPlaying ? "pause" : "play"} 
                  onClick={isPlaying ? handlePause : handlePlay} 
                />                
                <ControlButton type="next" onClick={handleNext} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Botón de suscripción */}
      <div className="subscribe-section">
        <Link to="/subs" className="subscribe-link">Suscríbete a Kodigo Music</Link>
      </div>
    </div>
  );
}

export default Home;
