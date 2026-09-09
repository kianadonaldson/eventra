import React, { useState, useEffect } from 'react';
import CategorySelect from '../components/CategorySelect';
import EventCard from '../components/EventCard';
import Search from '../components/Search';
import SurpriseMe from '../components/SurpriseMe';
import UpcomingOnly from '../components/UpcomingOnly';
import Sort from '../components/Sort';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #f5f5f5;
        color: #121212;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    body.dark {
        background-color: #121212;
        color: #f5f5f5;
    }
`;

const Title = styled.h1`
    font-size: 60px;
    font-family: system-ui, sans-serif;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 0px;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 270px;
    gap: 15px;
    font-family: system-ui, sans-serif;
`;

const Button = styled.button`
    padding: 20px;
    margin: 15px;
    font-family: system-ui, sans-serif;
    background-color: ${({ $darkMode }) =>
        $darkMode ? '#f5f5f5' : '#121212'};
    color: ${({ $darkMode }) =>
        $darkMode ? '#121212' : '#f5f5f5'};
    border-radius: 50%;
    &:hover {
        cursor: pointer;
    }
`;

export default function Home({ visibleEvents, category, setCategory, loadMoreRef, favorites, handleFavorite, query, setQuery, handleSurpriseMe, handleUpcomingOnly, sortCategory, setSortCategory }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
      });
      
      useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
      }, [darkMode]);

    return (
        <>
            <GlobalStyle />

            <Title>Eventra</Title>

            <CategorySelect
                category={category}
                setCategory={setCategory}
            />

            <Search
                query={query}
                setQuery={setQuery}
            />

            <SurpriseMe
                handleSurpriseMe={handleSurpriseMe}
            />

            <UpcomingOnly
                handleUpcomingOnly={handleUpcomingOnly}
            />

            <Sort
                sortCategory={sortCategory}
                setSortCategory={setSortCategory}
            />

            <Button
                $darkMode={darkMode}
                onClick={() => setDarkMode(!darkMode)}
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Button>

            <Cards>
                {visibleEvents.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        handleFavorite={handleFavorite}
                        liked={favorites.some((f) => f._id === event._id)}
                    />
                ))}
            </Cards>

            <div ref ={loadMoreRef}></div>
        </>
    );
}