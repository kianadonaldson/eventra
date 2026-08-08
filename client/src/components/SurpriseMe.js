import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 20px;
    margin: 15px;
    font-family: system-ui, sans-serif;
    background-color: blue;
    color: white;
    border-radius: 50%;
    &:hover {
        background-color: black;
        cursor: pointer;
    }
`;

export default function SurpriseMe({ handleSurpriseMe }) {
    return (
        <Button onClick={handleSurpriseMe}>
            Surpise Me
        </Button>
    )
}