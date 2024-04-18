import React from 'react';

const AnimeReview = ({ review }) => {
    return (
        <div className="anime-review">
            <h2>Review by {review.profile}</h2>
            <p>{review.text}</p>
            <p>Overall Score: {review.score}</p>
            <a href={review.link} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
};

export default AnimeReview;
