import React, { useEffect, useState, useRef } from 'react';
import { getTracks } from '../services/jamendoService';
import ControlButton from './ControlButton';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState('synthwave'); // Categoría por defecto
  const [progress, setProgress] = useState(0); // Estado para el progreso
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const categories = ['synthwave', 'indiepop', 'rock', 'funk', 'latin pop']; // Lista de categorías

  // Fetch tracks cuando cambia la categoría
  useEffect(() => {
    async function fetchTracks() {
      const tracksData = await getTracks(category);
      setTracks(tracksData);
      if (tracksData.length > 0) {
        setCurrentTrack(tracksData[0]);
      }
    }
    fetchTracks();
  }, [category]);

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
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (tracks.length > 0) {
      const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
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

  // Manejar el tiempo actual
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / currentTrack.duration) * 100);
    }
  };

  // Manejar el cambio en la barra de progreso
  const handleSeek = (event) => {
    const seekTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    // Solo agregar el listener si el audio no es null
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef.current]);

  // Calcular minutos transcurridos y restantes
  const duration = currentTrack ? currentTrack.duration : 0;  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h2>Kodigo Music</h2>
      <div className="player-container">
        <div className="category-container">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map((cat) => (
              <li 
                key={cat} 
                className={cat === category ? 'active-category' : ''}
                onClick={() => setCategory(cat)} // Cambia la categoría al hacer clic
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="track-list-container">
          <h3>Playlist</h3>
          <table className="track-list striped">
            <thead>
              <tr>
                <th className='text-left'>#</th>
                <th className='text-left'>Song</th>
                <th className='text-center'>Album</th>
                <th className='text-right'>Duration</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr 
                  key={track.id} 
                  className={track.id === currentTrack?.id ? 'active-track' : ''}
                  onClick={() => handleTrackClick(track)}
                >
                  <td className='text-left'>{index + 1}</td>
                  <td className='text-left'>{track.name}</td>
                  <td className='text-center'>{track.album}</td>
                  <td className='text-right'>{(track.duration / 60).toFixed(2)} min</td>
                </tr>
              ))}
            </tbody>
          </table>
          
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

              {/* Barra de progreso */}
              <input
                type="range"
                min="0"
                max={currentTrack ? currentTrack.duration : 0}
                value={currentTime}
                onChange={handleSeek}
                className="progress-bar"
              />
              <div className="progress-time">
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </>
          )}
          
        </div>
        
      </div>
      
      {/* Botón de suscripción */}
      <div className="subscribe-section">
        <Link to="/subs" className="subscribe-link">Subscribe to Kodigo Music</Link>
      </div>      
    </div>    
  );
}

export default Home;
