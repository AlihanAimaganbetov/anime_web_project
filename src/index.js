import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimePage from "./AnimePage/AnimePage";
import store from './redux/store';
import FavoritesPage from './Favorites/FavoritesPage';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route path="/anime/:uid" element={<AnimePage />} />
                    <Route path='/favorites' element={<FavoritesPage />}></Route>
                </Routes>
            </Router>
        </React.StrictMode>
    </Provider>
);
