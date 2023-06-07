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

export const TerminalContainer = styled.div`
    padding: 2rem;
    background-color: #1f2228;
    display: flex;
    flex-direction: column;
    height: 20rem;
    overflow: hidden;
    border-top: 0.2rem solid #3c3c4a;
`;

export const TabContainer = styled.div`
    color: #fff;
    display: flex;
    padding: 0.5rem;
    gap: 2.4rem;
    margin-bottom: 1rem;
`;

export const Tab = styled.div<{ active: boolean }>`
    display: inline-block;
    position: relative;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${({ active }) => (active ? "#FFFFFF" : "#9099ac")};
    cursor: pointer;
    border-radius: 3px;
    transition: 0.3s;

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(${({ active }) => (active ? 1 : 0)});
        height: 0.2rem;
        bottom: 0;
        left: 0;
        background-color: #b8becc;
        transition: transform 0.25s ease-out;
    }
`;

export const ContentContainer = styled.div`
    flex: 1;
    padding: 0.5rem;
    color: #fff;
    overflow-y: auto;

    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.1rem;
`;
