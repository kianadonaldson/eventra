import React from 'react';
import CategorySelect from '../components/CategorySelect';
import EventCard from '../components/EventCard';
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

export default function Home({ visibleEvents, category, setCategory, loadMoreRef, favorites, handleFavorite }) {
    return (
        <>
            <Title>Eventra</Title>

            <CategorySelect
                category={category}
                setCategory={setCategory}
            />

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