// store/index.js
import { createStore } from 'redux';
import favoritesReducer from '../Favorites/favoritesReducer';

const store = createStore(favoritesReducer);

export default store;
