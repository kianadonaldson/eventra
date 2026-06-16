import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    padding: 10px;
    margin: 15px;
    font-family: system-ui; sans-serif;
`;

export default function CategorySelect({ category, setCategory }) {
    return (
        <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="All">All Categories</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            <option value="Nightlife">Nightlife</option>
            <option value="Networking">Networking</option>
        </Select>
    );
}