import React from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';

const Card = styled.div`
    border: 2px solid #C0C0C0;
    border-radius: 20px;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
`;

const Description = styled.p`
    overflow-y: auto;
    margin: 0;
`;

export default function EventCard({ event, handleFavorite, liked }) {

    let date = new Date(event.date);
    date = date.toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric'
    })

    return (
        <Card>
            <h3>{event.title}</h3>
            <Heart
                onClick={() => handleFavorite(event)}
                style={{
                    cursor: "pointer",
                    fill: liked ? "red" : "none",
                    stroke: liked ? "red" : "currentColor"
                }}
            />
            <p>{date}</p>
            <p>{event.location}</p>
            <Description>{event.description}</Description>
        </Card>
    )
}