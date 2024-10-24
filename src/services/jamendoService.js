// src/services/jamendoService.js
const CLIENT_ID = '0036a3cd';

const BASE_URL = 'https://api.jamendo.com/v3.0';

export async function getTracks(category) {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=jsonpretty&limit=10&tags=${category}&lang=en`
    );
    const data = await response.json();
    return data.results.map((track) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      album:track.album_name,      
      album_image: track.album_image,
      audio: track.audio,
    }));
  } catch (error) {
    console.error('Error al obtener las canciones de Jamendo:', error);
    return [];
  }
}
