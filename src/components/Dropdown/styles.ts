import styled from "styled-components";

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
    padding: 1.2rem;
    background-color: transparent;
    border: 0;
    border-radius: 0.4rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.4rem;

    transition: 0.3s;

    background-color: ${({ isOpen }) => (isOpen ? "#2e3139" : "transperent")};
    color: ${({ isOpen }) => (isOpen ? "#FFFFFF" : "#c4cbda")};

    &:hover {
        color: #ffffff;
        background-color: #2e3139;
    }
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0.4rem;
    background-color: #2e3139;
    border-radius: 0.4rem;
    list-style-type: none;
    z-index: 1;
    max-height: 20rem;
    min-width: 25rem;
    width: 100%;
    overflow-y: auto;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

export const DropdownItem = styled.li`
    font-size: 1.3rem;
    color: #fff;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    border-radius: 0.4rem;

    &:hover {
        color: #c4cbda;
        background-color: #1f2228;
    }
`;
