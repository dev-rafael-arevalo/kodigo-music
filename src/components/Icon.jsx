// src/components/Icon.jsx
import React from 'react';

function Icon({ type }) {
  switch (type) {
    case 'play':
      return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
    case 'pause':
      return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
    case 'back':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M4 12l8-8v16l-8-8zM12 12l8-8v16l-8-8z" /> {/* Icono de "fast forward" */}
        </svg>
      );
    case 'next':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 12l-8 8V4l8 8zM20 12l-8 8V4l8 8z" /> {/* Icono de "next" invertido */}
        </svg>
      );
    default:
      return null;
  }
}

export default Icon;
