import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
function App() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/Anime`);
                setItems(response.data);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAnime();
    }, []);

    useEffect(() => {
        // Фильтрация списка аниме на основе запроса поиска
        const filteredResults = items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
        setTotalPages(Math.ceil(filteredResults.length / 10)); // Пересчет общего количества страниц
        setCurrentPage(1); // Сброс текущей страницы при изменении запроса поиска
    }, [searchQuery, items]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
                {i}
            </button>
        );
    }

    return (
        <div className="container">

            <input className="search-input"
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {searchResults.slice(startIndex, endIndex).map((item, index) => (
                    <li key={item.id || index}>
                        <div>
                            <p>{item.title}</p>
                            <img src={item.img_url} alt={item.title} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
                {pageButtons}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
            </div>
        </div>
    );
}

export default App;
