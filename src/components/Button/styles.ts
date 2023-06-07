import styled from "styled-components";

export const StyledButton = styled.button`
    color: #bdc3d1;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    padding: 0.8rem 1.6rem;

    border: 0.2rem solid #3c3c4a;
    border-radius: 0.8rem;
    background: #2a2d34;

    cursor: pointer;

    display: inline-block;
    text-align: center;
    text-decoration: none;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
    }
`;
