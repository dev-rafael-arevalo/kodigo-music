import React, { useEffect, useState, useRef } from 'react';
import { getTracks } from '../services/jamendoService';
import ControlButton from './ControlButton';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [category, setCategory] = useState('synthwave');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const audioRef = useRef(null);

  const categories = ['synthwave', 'indiepop', 'rock', 'funk', 'latin pop'];

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / currentTrack.duration) * 100);
    }
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef.current]);

  const duration = currentTrack ? currentTrack.duration : 0;  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
<div className="container p-1 col-md-12">
  <h2>Qappital Music</h2>
  
  <div className="row mt-3 bg bg-dark p-5">
    {/* Sidebar de categorías */}
    <div className="col-md-2 col-sm-12">
      {/* Botón para mostrar categorías en pantallas pequeñas */}
      <button 
        className="btn btn-success d-md-none" 
        onClick={() => setShowCategories(!showCategories)}
      >
        ☰ Categories
      </button>

      {/* Lista de categorías, visible en pantallas grandes o cuando está activa en pantallas pequeñas */}
      {(showCategories || window.innerWidth >= 768) && (
        <ul className="mt-2">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`row justify-content-center col-md-12 col-sm-6 mb-2 category-button ${cat === category ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </ul>
      )}
    </div>

    {/* Contenido central - Lista de canciones */}
    <div className="bg bg-gray col-md-7 col-sm-12">
      <h6 className="text-white">Playlist</h6>
      <table className="table table-dark table-striped text-white small m-2">
        <thead className="table-warning">
          <tr>
            <th>#</th>
            <th>Song</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
  {tracks.map((track, index) => (
    <tr 
      key={track.id} 
      className={track.id === currentTrack?.id ? 'table-success' : ''}
      onClick={() => handleTrackClick(track)}
    >
      <td>{index + 1}</td>
      <td>
        <div>
          <span>{track.name}</span>
        </div>
      </td>
      <td>{track.album}</td>
      <td>{(track.duration / 60).toFixed(2)} min</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>

    {/* Controles de reproducción */}
    <div className="col-md-3 col-sm-12 text-center">
  {currentTrack && (
    <>
      <div>
        <h3 className="text-white">{currentTrack.name}</h3>
      </div>
      <img src={currentTrack.album_image} alt={currentTrack.name} className="img-fluid rounded" />
      <audio ref={audioRef} />
      <div className="mt-3">
        <ControlButton type="back" onClick={handlePrevious} />
        <ControlButton type={isPlaying ? "pause" : "play"} onClick={isPlaying ? handlePause : handlePlay} />
        <ControlButton type="next" onClick={handleNext} />
      </div>
      <input
        type="range"
        min="0"
        max={currentTrack ? currentTrack.duration : 0}
        value={currentTime}
        onChange={handleSeek}
        className="form-range mt-3"
      />
      <div className="mt-2 text-white">
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </>
  )}
</div>

  </div>

  {/* Enlace de suscripción */}
  <div className="text-center p-4">
    <Link to="/subs" className="btn btn-primary">Subscribe to Qappital Music</Link>
  </div>
</div>

  );
}

export default Home;
