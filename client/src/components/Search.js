import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
    padding: 10px;
    margin: 15px;
    font-family: system-ui, sans-serif;
`;

export default function Search({ query, setQuery }) {
    return (
        <SearchBar
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events"
        />
    );
}