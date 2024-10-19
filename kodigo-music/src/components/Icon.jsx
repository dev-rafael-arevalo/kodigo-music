// src/components/Icon.jsx
import React from 'react';

function Icon({ type }) {
  switch (type) {
    case 'play':
      return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>;
    case 'pause':
      return <svg width="24" height="24" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
    case 'next':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M6 12h14m-8-8l8 8-8 8" /> {/* Icono de siguiente */}
        </svg>
      );
    case 'back':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M18 12H4m8-8l-8 8 8 8" /> {/* Icono de retroceder */}
        </svg>
      );
    default:
      return null;
  }
}

export default Icon;
