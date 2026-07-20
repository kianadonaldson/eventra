import React from 'react';
import styled from 'styled-components';
import EventCard from '../components/EventCard';

const Title = styled.h1`
    font-size: 40px;
    font-family: system-ui, sans-serif;
    margin-top: 10px;
    margin-bottom: 0px;
`;

export default function Favorites({ favorites, setFavorites }) {
    const handleFavorite = (event) => {
        setFavorites((prev) =>
            prev.filter((e) => e._id !== event._id)
        );
    };

    return (
        <div>
            <Title>Favorite Events</Title>

            {favorites.length === 0 ? (
                <p>No favorite events yet.</p>
            ) : (
                <div>
                    {favorites.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                            handleFavorite={handleFavorite}
                            liked={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}