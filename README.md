# 🎶 Kodigo Music

**Kodigo Music** is a music streaming application built with **React** and **Vite**, designed to offer a song playback experience inspired by platforms like Spotify, Deezer, and Apple Music. The app allows users to listen to a playlist, navigate through music categories, and explore subscription options.

---

## 📜 Project Overview

Kodigo Music is an interactive platform for music streaming, providing a functional playlist with play, pause, next, and previous buttons, as well as a subscription system. The application integrates the **Jamendo** API to fetch songs, and offers an attractive, responsive interface inspired by Spotify's color scheme and style.

---

## 🚀 Key Features

- **Music Playback**: Play, pause, and skip through songs in the playlist.
- **Song Navigation**: Next and previous buttons with automatic playback of the next or previous track.
- **Song List**: Displays all available tracks with details like name, artist, and album.
- **Album Art**: Shows the album image of the currently playing song.
- **Kodigo Music Subscription**: Option to subscribe and unlock more features.
- **Attractive, Responsive Design**: Spotify-inspired design with similar colors and typography, optimized for mobile and desktop devices.
- **Clean Code Practices**: Modular, well-structured code with independent components and a clear routing system.

---

## 🛠️ Technologies Used

- **React** with **Vite** for project structure
- **React Router** for navigation between pages
- **Jamendo API** for free music tracks
- **Bootstrap** for responsive design and layout
- **FontAwesome** for attractive icons
- **SweetAlert** and **Toastr** for user-friendly alerts and notifications
- **Custom CSS** for additional styling and a visually appealing interface

---

## 📂 Project Structure

```plaintext
├── src
│   ├── assets            # Contains images and the Kodigo Music logo
│   ├── components        # Reusable components like ControlButton
│   ├── pages             # Application pages (e.g., Home, Subscription)
│   ├── routes            # Route configuration in a single Route.jsx file
│   ├── services          # Services to handle the Jamendo API
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry file
└── README.md
```

---

## 🖥️ Installation and Run Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dev-rafael-arevalo/kodigo-music.git
cd kodigo-music
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project in development mode

```bash
npm run dev
```

### 4. Build the project for production

```bash
npm run build
```

---

## 🎨 Styling and UI

Kodigo Music’s design is inspired by Spotify’s colors and styles. It features green lines and dark colors for a modern and sleek user experience. Each component has an independent CSS file to maintain modularity and make style customization easy.

---

## 📑 API Documentation

This application uses the **Jamendo** API to fetch music tracks. You can refer to the [Jamendo API documentation](https://developer.jamendo.com/v3.0) for more details on the endpoints and how they are utilized within the app.

---

## 📚 Future Features

Some planned improvements for future versions of Kodigo Music include:

- **Music Categories**: Advanced browsing by genres and artists.
- **Favorites and Playlists**: Save favorite songs and create custom playlists.
- **Dark/Light Mode**: Switch between different color themes.
- **User Authentication**: Advanced features to manage user accounts and subscriptions.

---

## 👤 Author

**Rafael Arévalo**  
[GitHub](https://github.com/dev-rafael-arevalo)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out Kodigo Music! 🎧
