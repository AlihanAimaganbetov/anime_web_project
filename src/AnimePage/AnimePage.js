import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './AnimePage.css';
import AnimeReview from '../AnimeReview/AnimeReview';

function AnimePage() {
    const { uid } = useParams();
    const [anime, setAnime] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchAnimeById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Anime/${uid}`);
                setAnime(response.data);

                loadReviews(uid);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            }
        };
        fetchAnimeById();
    }, [uid]);

    const loadReviews = async (animeUid) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/reviews/${animeUid}`);
            // Ограничение до 10 отзывов
            setReviews(response.data.slice(0, 10));
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    if (!anime) {
        return <div className="anime-page">Loading...</div>;
    }

    return (
        <div className="anime-page">
            <Link to="/">
                <button>Back</button>
            </Link>
            <p>id : {anime.uid}</p>
            <p>Title: {anime.title}</p>
            <img src={anime.img_url} alt={anime.title}/>
            <p>Description: {anime.synopsis}</p>
            <p>Genre: {anime.genre}</p>
            <p>Aired: {anime.aired}</p>
            <p>Episodes: {anime.episodes}</p>
            <p>Popularity: {anime.popularity}</p>

            <div className="anime-reviews">
                <h2>Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <AnimeReview key={review.review_id} review={review} />
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </div>
    );
}

export default AnimePage;
