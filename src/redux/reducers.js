import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FETCH_FAVORITES_SUCCESS
} from './action';

const initialState = {
  favorites: []
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.uid !== action.payload)
      };
    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload
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
    