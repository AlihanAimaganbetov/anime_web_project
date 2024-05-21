import { toast } from 'react-toastify';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

// Пример получения данных пользователя
const getUserData = () => JSON.parse(localStorage.getItem('userData'));

export const addToFavorites = (item) => (dispatch) => {
    const userData = getUserData();
    if (!userData) {
        toast.error('User not logged in.');
        return;
    }
    const { id: userId } = userData.user;
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    const updatedFavorites = [...favorites, item];
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
    dispatch({ type: ADD_TO_FAVORITES, payload: item });
    toast.success('Added to favorites.');
};

export const fetchFavorites = () => (dispatch) => {
    const userData = getUserData();
    if (!userData) {
        toast.error('User not logged in.');
        return;
    }

    const { id: userId } = userData.user;
    try {
        const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: favorites });
    } catch (error) {
        toast.error('Failed to fetch favorites.');
    }
};

export const removeFromFavorites = (animeId) => (dispatch) => {
    const userData = getUserData();
    if (!userData) {
        toast.error('User not logged in.');
        return;
    }

    const { id: userId } = userData.user;
    try {
        const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        const updatedFavorites = favorites.filter(item => item.uid !== animeId);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
        dispatch({ type: REMOVE_FROM_FAVORITES, payload: animeId });
        toast.success('Removed from favorites.');
    } catch (error) {
        toast.error('Failed to remove from favorites.');
    }
};
