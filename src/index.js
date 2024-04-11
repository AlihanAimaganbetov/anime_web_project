import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimePage from "./AnimePage/AnimePage";
import store from './redux/store';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<App/>} />
                <Route path="/anime/:uid" element={<AnimePage />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
