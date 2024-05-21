import { toast } from 'react-toastify';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';


export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

export const addToFavorites = (item) => ({
    type: ADD_TO_FAVORITES,
    payload: item,
});

export const fetchFavorites = () => async dispatch => {
    try {
        // Здесь, вы можете инициализировать избранное из локального хранилища или любого другого источника.
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: favorites });
    } catch (error) {
        toast.error('Failed to fetch favorites.');
    }
};

export const removeFromFavorites = (animeId) => dispatch => {
    try {
        dispatch({ type: REMOVE_FROM_FAVORITES, payload: animeId });
        toast.success('Removed from favorites.');
    } catch (error) {
        toast.error('Failed to remove from favorites.');
    }
};
