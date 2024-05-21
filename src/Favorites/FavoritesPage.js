// FavoritesPage.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/reducers';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'

function FavoritesPage() {
    const favorites = useSelector(state => state.favorites.favorites);
    const dispatch = useDispatch();
    console.log(favorites);
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
                                        <Link to={`/anime/${item.uid}`}>
                                            <img src={item.img_url} alt={item.title}/>
                                        </Link>
                                    </div>
                                    <div className='app-synopsis'>
                                        <p><b>Description: </b> {item.synopsis}</p>
                                        <p><b>Score: </b> {item.score}</p>
                                        <p><b>Episodes: </b> {item.episodes}</p>
                                        <p><b>Genre: </b>{item.genre}</p>
                                        <p><b>Aired: </b>{item.aired}</p>
                                    </div>
                                </div>
                                <div className='addToFavorites'>
                                    <button onClick={() => handleRemoveFromFavorites(item)}>Add to Favorite</button>
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
