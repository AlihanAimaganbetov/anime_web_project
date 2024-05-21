import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites} from '../redux/action';
import {Link} from 'react-router-dom';
import './App.css'
import { logout } from '../redux/authActions';

interface Anime {
    title: string;
    genre: string;
    score: number;
    uid: number;
    img_url: string;
    synopsis: string;
    aired: string;
    episodes: number;
}

const App: React.FC<{}> = () => {
    const [items, setItems] = useState<Anime[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const genre: string[] = ['Seinen', 'Comedy', 'Slice of Life', 'Shounen', 'Shounen Ai', 'Shoujo', 'Game', 'Drama', 'Shoujo Ai', 'Kids', 'Demons', 'Space', 'Magic', 'Super Power', 'Psychological', 'Sci-Fi', 'Romance', 'Josei', 'Yuri', 'Ecchi', 'Mystery', 'Horror', 'Historical', 'Thriller', 'Cars', 'Military', 'Police', 'Dementia', 'Mecha', 'School', 'Martial Arts', 'Supernatural', 'Action', 'Harem', 'Music', 'Vampire', 'Samurai', 'Adventure', 'Fantasy', 'Parody', 'Sports'];
    const dispatch = useDispatch();
    // @ts-ignore
    const authState = useSelector(state => state.auth);
    const userData = localStorage.getItem('userData')
    console.log(userData)

    const handleLogout = () => {
        // @ts-ignore
        dispatch(logout());
        window.location.reload();
    };
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: token });
        }
    }, [dispatch]);
    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get<Anime[]>('http://localhost:5000/api/Anime');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAnime();
    }, []);

    const extractYear = (aired: string): number => {
        // Разбиваем строку на компоненты даты
        const dateComponents = aired.split(", ");
        // Получаем последний компонент, содержащий год
        const yearString = dateComponents[dateComponents.length - 1];
        // Преобразуем строку с годом в числовое значение
        const year = parseInt(yearString);
        // Возвращаем год
        return year;
    };

    const sortByAired = () => {
        const sortedItems = [...items].sort((a, b) => {
            const yearA = extractYear(a.aired);
            const yearB = extractYear(b.aired);
            // Сравниваем года выпуска
            return yearB - yearA;
        });
        setItems(sortedItems);
        setCurrentPage(1);
    };

    useEffect(() => {
        const filteredResults = items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setTotalPages(Math.ceil(filteredResults.length / 10));
        setCurrentPage(1);
    }, [searchQuery, items]);
    const addToFavoritesHandler = (item: Anime) => {
        dispatch(addToFavorites(item));
        alert("Add")
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
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    const pageButtons: JSX.Element[] = [];
    const maxButtonsToShow: number = 10;


    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
    for (let i: number = startPage; i <= endPage; i++) {

        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
                {i}
            </button>
        );
    }
    return (<div className="app-container">
        <div>
            {authState.user ? (
                <div>

                    <h2>Welcome! You are logged in.</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>You are not logged in.</h2>
                </div>
            )}
        </div>
        <Link to="login">
            <button>login</button>
        </Link>
        <Link to="register">
            <button>register</button>
        </Link>
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
            <button onClick={sortByAired}>Sort by Aired</button>
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
                .map((item, index) => (<li key={item.uid || index}>
                    <div className='anime'>
                        <p>{item.title}</p>
                        <div className='img-synopsis'>
                            <div className='app-img'>
                                <Link to={`/anime/${item.uid}`}>
                                    <img src={item.img_url} alt={item.title}/>
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
                        <div className='addToFavorites'>
                            <button onClick={() => addToFavoritesHandler(item)}>Add to Favorite</button>
                        </div>
                    </div>


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
export default App
