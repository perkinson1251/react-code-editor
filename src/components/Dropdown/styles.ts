import styled from "styled-components";

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
    padding: 0.6rem;
    background-color: transparent;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    color: #ffffff;

    transition: 0.3s;

    background-color: ${({ isOpen }) => (isOpen ? "#101010" : "transperent")};
    color: ${({ isOpen }) => (isOpen ? "#47c7c1" : "#FFFFFF")};

    &:hover {
        color: #47c7c1;
        background-color: #101010;
    }
`;

export const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 0;
    margin: 4px 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style-type: none;
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
`;

export const DropdownItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;
