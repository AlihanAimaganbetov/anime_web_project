import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export const removeFromFavorites = (item) => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: item,
});

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.uid !== action.payload.uid),
      };
    default:
      return state;
  }
};


const reducers = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
});

export default reducers ;
    