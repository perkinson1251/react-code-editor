import styled from "styled-components";

export const OutputWindowContainer = styled.div`
    font-size: 1.2rem;
    background-color: #000;
    color: #fff;
    font-family: monospace;
    padding: 1.6rem;
`;

export const OutputWindowOutput = styled.div`
    overflow: auto;
    max-height: 20rem;
`;

export const OutputWindowInput = styled.input`
    background-color: transparent;
    border: none;
    color: #fff;
    font-family: monospace;
    width: 100%;
    outline: none;

    &:focus {
        outline: none;
    }
`;
