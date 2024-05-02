// FavoritesPage.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/reducers';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'

function FavoritesPage() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFromFavorites(item));
    };

    return (
        <div className='app-container'>
            <Link to="/">
                <div className='back'>
                <button>Back</button>
                </div>
            </Link>
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {favorites.map(item => (
                        <li key={item.uid}>
                            <div className='anime'>
                                <p>{item.title}</p>
                                <div className='img-synopsis'>

                                    <div className='app-img'>
                                        <img src={item.img_url} alt={item.title} />
                                    </div>
                                    <div className='app-synopsis'>{item.synopsis}</div>


                                </div>
                                <div className='addToFavorites'>
                                <button onClick={() => handleRemoveFromFavorites(item)}>Remove from Favorites</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FavoritesPage;
