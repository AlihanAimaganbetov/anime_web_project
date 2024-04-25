// FavoritesPage.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/reducers';
import { Link } from 'react-router-dom';


function FavoritesPage() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFromFavorites(item));
    };

    return (
        <div>
            <Link to="/">
                <button>Back</button>
            </Link>
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {favorites.map(item => (
                        <li key={item.uid}>
                            <div>
                                <p>{item.title}</p>
                                <img src={item.img_url} alt={item.title} />
                                {item.synopsis}
                                <button onClick={() => handleRemoveFromFavorites(item)}>Remove from Favorites</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FavoritesPage;
