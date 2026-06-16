import React, { useEffect, useState } from 'react';
import CategorySelect from './components/CategorySelect';
import EventCard from './components/EventCard';
import styled from 'styled-components';

const Title = styled.h1`
    font-family: system-ui; sans-serif;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 300px;
    gap: 15px;
    font-family: system-ui; sans-serif;
`;

export default function App() {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('All');

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

    return (
        <div>
            <Title>Eventra</Title>

            <CategorySelect
                category={category}
                setCategory={setCategory}
            />
            <Cards>
                {selectedEvents.map(event => (
                    <EventCard
                        key={event._id}
                        event={event}
                    />
                ))}
            </Cards>
        </div>
    );
}