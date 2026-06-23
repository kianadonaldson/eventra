import React, { useEffect, useState, useRef } from 'react';
import CategorySelect from './components/CategorySelect';
import EventCard from './components/EventCard';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 60px;
    font-family: system-ui; sans-serif;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 0px;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 270px;
    gap: 15px;
    font-family: system-ui; sans-serif;
`;

export default function App() {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);
    const loadMoreRef = useRef(null);

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

    return (
        <div>
            <Title>Eventra</Title>
            <CategorySelect
                category={category}
                setCategory={setCategory}
            />
            <Cards>
                {visibleEvents.map(event => (
                    <EventCard
                        key={event._id}
                        event={event}
                    />
                ))}
            </Cards>
            <div ref ={loadMoreRef}></div>
        </div>
    );
}