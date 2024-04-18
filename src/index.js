import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimePage from "./AnimePage/AnimePage";
import store from './redux/store';
import FavoritesPage from './Favorites/FavoritesPage';
import { Provider } from 'react-redux';
import "./index.css"
import SimplePage from './page.tsx'

createRoot(document.getElementById('root')).render(
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jacquard+24&family=Jersey+25&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Micro+5+Charted&display=swap" rel="stylesheet"></link>

        <Provider store={store}>
            <React.StrictMode>
                <Router>
                    <Routes>
                        <Route path='/page' element={<SimplePage />} />
                        <Route exact path="/" element={<App />} />
                        <Route path="/anime/:uid" element={<AnimePage />} />
                        <Route path='/favorites' element={<FavoritesPage />}></Route>
                    </Routes>
                </Router>
            </React.StrictMode>
        </Provider>
    </div>
);
