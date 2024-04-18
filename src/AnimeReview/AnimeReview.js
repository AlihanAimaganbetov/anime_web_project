import React, { useState } from 'react';

const AnimeReview = ({ review }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="anime-review">
            <h2>Review by {review.profile}</h2>
            <p>{expanded ? review.text : review.text.slice(0, 700) + '...'}</p>
            {review.text.length > 700 && (
                <button onClick={toggleExpand}>
                    {expanded ? 'Скрыть' : 'Раскрыть'}
                </button>
            )}
            <p>Overall Score: {review.score}</p>
            <a href={review.link} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
    );
};

export default AnimeReview;

