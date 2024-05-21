import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Импортируем middleware thunk из redux-thunk
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk)); // Применяем middleware thunk

export default store;
