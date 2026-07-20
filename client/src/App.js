import React, { useEffect, useState, useRef } from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';

const Nav = styled.nav`
    font-family: system-ui, sans-serif;
    margin-top: 20px;
`;

export default function App() {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const loadMoreRef = useRef(null);
    const [favorites, setFavorites] = useState([]);

    const fetchEvents = () => {
        fetch('/api/events')
        .then(res => res.json())
        .then(data => setEvents(data));
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const selectedEvents =
        category === 'All'
            ? events
            : events.filter(event => event.category === category);

    const visibleEvents = selectedEvents.slice(0, visibleCount);

    useEffect(() => {
        setVisibleCount(6);
    }, [category]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (
                    entries[0].isIntersecting && 
                    visibleCount < selectedEvents.length
                ) {
                    setVisibleCount(prev => prev + 6);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = loadMoreRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [visibleCount, selectedEvents.length]);

    const handleFavorite = (event) => {
        setFavorites((prev) => {
          const exists = prev.find((e) => e._id === event._id);
      
          if (exists) {
            return prev.filter((e) => e._id !== event._id);
          }
      
          return [...prev, event];
        });
      };

    return (
        <>
            <Nav>
                <Link to="/">Home</Link>
                {' | '}
                <Link to="/favorites">Favorites</Link>
            </Nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            visibleEvents={visibleEvents}
                            category={category}
                            setCategory={setCategory}
                            loadMoreRef={loadMoreRef}
                            favorites={favorites}
                            handleFavorite={handleFavorite}
                        />
                    }
                />

                <Route
                    path="/favorites"
                    element={
                        <Favorites
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                />
            </Routes>
        </>
    );
}