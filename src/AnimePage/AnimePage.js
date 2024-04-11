import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Импорт Link из react-router-dom
import './AnimePage.css';

function AnimePage() {
    const { uid } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const fetchAnimeById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Anime/${uid}`);
                setAnime(response.data);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            }
        };
        fetchAnimeById();
    }, [uid]);

    if (!anime) {
        return <div className="anime-page">Loading...</div>;
    }

    return (
        <div className="anime-page">
            <Link to="/">
                <button>Back</button>
            </Link>
            <p>Title: {anime.title}</p>
            <img src={anime.img_url} alt={anime.title}/>
            <p>Description: {anime.synopsis}</p>
            <p>Genre: {anime.genre}</p>
            <p>Aired: {anime.aired}</p>
            <p>Episodes: {anime.episodes}</p>
            <p>Popularity: {anime.popularity}</p>
        </div>
    );
}

export default AnimePage;
