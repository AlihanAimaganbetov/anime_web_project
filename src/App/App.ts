import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/action'; // Подставьте правильный путь к вашему action
// type Button = React.HTMLAttributes<HTMLButtonElement>; // Using the imported Button type
import { Button } from 'antd';

interface Anime {
    title: string;
    genre: string;
    score: number;
    // Добавьте другие поля, если они есть в вашем объекте Anime
}

const App: React.FC<{}> = () => {

    const [items, setItems] = useState<Anime[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const genre: string[] = ['Seinen', 'Comedy', 'Hentai', 'Slice of Life', 'Shounen', 'Shounen Ai', 'Shoujo', 'Game', 'Drama', 'Shoujo Ai', 'Kids', 'Demons', 'Space', 'Magic', 'Super Power', 'Psychological', 'Sci-Fi', 'Romance', 'Josei', 'Yuri', 'Ecchi', 'Mystery', 'Horror', 'Historical', 'Thriller', 'Cars', 'Military', 'Police', 'Dementia', 'Mecha', 'School', 'Martial Arts', 'Supernatural', 'Action', 'Harem', 'Music', 'Vampire', 'Samurai', 'Yaoi', 'Adventure', 'Fantasy', 'Parody', 'Sports'];
    const dispatch = useDispatch();

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

    useEffect(() => {
        const filteredResults = items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setTotalPages(Math.ceil(filteredResults.length / 10));
        setCurrentPage(1);
    }, [searchQuery, items]);

    const addToFavoritesHandler = (item: Anime) => {
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    const pageButtons: JSX.Element[] = [];
    const maxButtonsToShow: number = 10; // Максимальное количество кнопок на пагинации

    // Вычисляем начальную и конечную страницы для отображения
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
    for (let i: number = startPage; i <= endPage; i++) {

        pageButtons.push(
            <Button key={ i } onClick = {() => handlePageChange(i)} disabled = { i === currentPage}>
                { i }
                < /Button>
        );
    }


// Возвращаем JSX или null
return (
    <div>
    {/* Ваш JSX контент здесь */ }
    < /div>
);
}

export default App;
