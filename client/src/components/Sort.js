import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    padding: 10px;
    margin: 15px;
    font-family: system-ui, sans-serif;
`;

export default function Sort({ sortCategory, setSortCategory }) {
    return (
        <Select 
            value={sortCategory}
            onChange={(e) => setSortCategory(e.target.value)}
        >
            <option value="" disabled>
                Sort by
            </option>
            <option value="default">Default</option>
            <option value="soonest">Date: Soonest</option>
            <option value="latest">Date: Latest</option>
            <option value="title">Title: A-Z</option>
        </Select>
    )
};