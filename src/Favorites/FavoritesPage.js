// FavoritesPage.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from './favoritesReducer';

function FavoritesPage() {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (item) => {
    dispatch(removeFromFavorites(item));
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map(item => (
            <li key={item.id}>
              <div>
                <p>{item.title}</p>
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
