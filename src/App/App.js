import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';
import { addToFavorites } from '../redux/action';
import { useDispatch } from 'react-redux';

function App() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const genre = ['Seinen', 'Comedy', 'Hentai', 'Slice of Life', 'Shounen', 'Shounen Ai', 'Shoujo', 'Game', 'Drama', 'Shoujo Ai', 'Kids', 'Demons', 'Space', 'Magic', 'Super Power', 'Psychological', 'Sci-Fi', 'Romance', 'Josei', 'Yuri', 'Ecchi', 'Mystery', 'Horror', 'Historical', 'Thriller', 'Cars', 'Military', 'Police', 'Dementia', 'Mecha', 'School', 'Martial Arts', 'Supernatural', 'Action', 'Harem', 'Music', 'Vampire', 'Samurai', 'Yaoi', 'Adventure', 'Fantasy', 'Parody', 'Sports'];
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Anime');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAnime();
    }, []);
    

    useEffect(() => {
        const filteredResults = items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setTotalPages(Math.ceil(filteredResults.length / 10));
        setCurrentPage(1);
    }, [searchQuery, items]);

    const addToFavoritesHandler = (item) => {
        dispatch(addToFavorites(item));
        alert("добавлено")
    };
    useEffect(() => {
        const filteredResults = items.filter(item => selectedGenre ? item.genre.toLowerCase().includes(selectedGenre.toLowerCase()) : true);
        setTotalPages(Math.ceil(filteredResults.length / 10));
        setCurrentPage(1);
    }, [selectedGenre, items]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const sortByScore = () => {
        const sortedItems = [...items].sort((a, b) => b.score - a.score);
        setItems(sortedItems);
        setCurrentPage(1); // Сбрасываем текущую страницу при изменении порядка элементов
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    const pageButtons = [];
    const maxButtonsToShow = 10; // Максимальное количество кнопок на пагинации

    // Вычисляем начальную и конечную страницы для отображения
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
                {i}
            </button>
        );
    }

    return (<div className="app-container">
        <header className="app-header">
            <Link to="favorites">
                <button>Favorites</button>
            </Link>
            <input
                className="search-input"
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={sortByScore}>Sort by Score</button>
            <label htmlFor="genres">Select Genre:</label>
            <select id="genres" onChange={e => setSelectedGenre(e.target.value)}>
                <option value="">All Genres</option>
                {genre.map(genre => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </header>
        <ul>
            {items
                .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .filter(item => selectedGenre ? item.genre.toLowerCase().includes(selectedGenre.toLowerCase()) : true)
                .slice(startIndex, endIndex)
                .map((item, index) => (<li key={item.id || index}>
                    <div className='anime'>
                        <p>{item.title}</p>
                        <div className='img-synopsis'>
                            <div className='app-img'>
                                <Link to={`/anime/${item.uid}`}>
                                    <img src={item.img_url} alt={item.title} />
                                </Link>
                            </div>
                            <div className='app-synopsis'>
                                <p><b>Description: </b> {item.synopsis}</p>
                                <p><b>Score: </b> {item.score}</p>
                                <p><b>Episodes: </b> {item.episodes}</p>
                                <p><b>Genre: </b>{item.genre}</p>
                                <p><b>Aired: </b>{item.aired}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => addToFavoritesHandler(item)}>Добавить в избранное</button>
                </li>))}

        </ul>

        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
            </button>
            {pageButtons}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
            </button>
        </div>
    </div>);
}

export default App;
