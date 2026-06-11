import React, { useEffect, useState } from 'react';

export default function App() {

    const fetchEvents = () => {
        fetch('/api/events')
        .then(res => res.json())
        .then(data => console.log(data));
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Eventra</h1>
        </div>
    )
}